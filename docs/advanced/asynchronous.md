# Asynchrones JavaScript

JavaScript wird ausgeführt in einer Single-Threaded-Runtime! Es gibt kein Multithreading in
JavaScript. Heutzutage läuft in der Regel in jedem Browser pro Tab ein Thread.

::: info
Mit der Worker-Spezifikation vom W3C kann man natürlich auch im Browser multi-threaded programmieren.
Hier läuft dann aber ein zweiter bzw. weitere Worker-Threads parallel jeweils in einer eigenen
single-thread Umgebung und die Kommunikation/Synchronisation erfolgt über Nachrichten/Messages/Events.
:::

Der bekannteste *Long-Running*-Code in der Web-Welt ist der Web-Request (aka AJAX-Request), der
aber seit einiger Zeit nur noch asynchron ausgeführt werden darf. Das heißt: der Browser macht
das "Off-Loading" des Wartens auf die Antwort und benachrichtigt uns, falls Fortschritte da sind.

Um dies zu realisieren existiert in JavaScript der Event-Loop und die Nachrichten-Queue. Der eine und
alleinige Thread wartet auf Aufgaben in der Queue, führt diese synchron aus (über den kompletten
Callstack) und kümmert sich danach erst wieder um die nächste Nachricht in der Queue.

```js
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

Diese "Nachrichten" sind Tasks/Funktionsaufrufe wie zum Beispiel
- Painting
- Nachricht von einem Worker
- Events, die ausgelöst werden
- Timer
- Fortschritt von HTTP Requests
- ...

Das ist hier nur sehr oberflächlich dargestellt, etwas genauer im [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop).

::: warning
Jeder eigene langläufige Code blockiert also die Abarbeitung des Event-Loops und der Browser-Tab
*steht* - bis zur Meldung: **Ein Script auf der Seite ragiert nicht** (oder so ähnlich).
:::

::: info
Falls eigener langläufiger Code implementiert werden muss(?), sollte das in einem `Worker`geschehen.
Oder der Algorithmus muss in Teile zerlegt werden, die jeweils über `setTimeout` angestoßen werden.
Damit werden die Teile immer wieder in den Loop reingehangen und blockieren nur für kürzere Zeit.
:::

## Muster der asynchronen Programmierung in JavaScript

Der *bekannteste* langläufige Vorgang ist der HTTP-Request. Dieser kann synchron - **deprecated**
- ausgeführt werden:

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.github.com/repos/lean-js/docs', false);
xhr.send(null); // Blocking as of false in the line above

const updateDatum = JSON.parse(
    xhr.responseText
  ).updated_at;

const formattedDate = new Date(updateDatum).toLocaleString('de');
```

Asynchron sieht der Code wie folgt aus:

```js
const xhr = new XMLHttpRequest();

xhr.addEventListener('readystatechange', () => {
  console.log(xhr.readyState);
  if(xhr.readyState === 4) {

    const updateDatum = JSON.parse(
      xhr.responseText
    ).updated_at;

    const formattedDate = new Date(updateDatum).toLocaleString('de');
  }
});

xhr.open('GET', 'https://api.github.com/repos/lean-js/docs');
xhr.send(null); // Asnychron as of (omitted) true in the line above
```

Wir nutzen also das Event `readystatechange` und reihen den Task, der dann ausgeführt werden soll
in den Event-Loop ein.

# Callback

Falls der Code in eine Funktion gewrappt werden soll zur Wiederverwendung nutzte man eine Funktion
mit einem Callback:

```js
function getUpdateDate(repoUrl, callback) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('readystatechange', () => {
    console.log(xhr.readyState);
    if(xhr.readyState === 4) {

      if (xhr.status !== 200) {
        throw Error('Ooops');
      }

      const updateDatum = JSON.parse(
        xhr.responseText
      ).updated_at;

      const formattedDate = new Date(updateDatum).toLocaleString('de');
      callback(formattedDate);
    }
  });

  xhr.open('GET', repoUrl);
  xhr.send(null); // Asnychron as of (omitted) true in the line above
}

getUpdateDate('https://api.github.com/repos/lean-js/docs', (datum) => {
  console.log(datum);
})
```

## Promise API

ECMAScript 2015 führte eine neue API ein, um asynchrone Vorgaänge auszuführen: die **Promise-API**. Diese erleichtert
insbesondere übliche Herausforderungen in der asynchronen Programmierung (mehrere abhängige Abrufe, das Warten auf
mehrere Abrufe, ...). Auch wurde damit die sogenannte *Call-Back-Hell* entschärft ([callbackell.com](http://callbackhell.com/)
oder [Callback Hell and Howto rescue it](https://dev.to/jerrycode06/callback-hell-and-how-to-rescue-it-ggj)).

```js
function getData(url) {
  // Constructor with Promise runner
  return new Promise((resolve,reject) => {

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
      console.log(xhr.readyState);
      if(xhr.readyState === 4) {

        if (xhr.status !== 200) {
          reject({status: xhr.status, text: xhr.statusText});
        }

        const data = JSON.parse(
          xhr.responseText
        );

        resolve(data);
      }
    });

    xhr.open('GET', repoUrl);
    xhr.send(null); // Asnychron as of (omitted) true in the line above
  });
}

getData('https://api.github.com/repos/lean-js/docs')
  .then(data => {
    console.log(new Date(data.updated_at).toLocaleString('de'))
  })
  .catch(err => {
    console.error(`Hoppla (${err.status}): ${err.text}`)
  })
```

## Async/Await

Mit ECMAScript 2017 wurden dann die neuen Schlüsselwörter `async` und `await` eingeführt, die die Programmierung
mit Promises wesentlich vereinfachen.

```js
function getData() {
  // Code wie oben
}

async function getUpdateDate() {
  const data = await getData('https://api.github.com/repos/lean-js/docs');
  console.log(new Date(data.updated_at).toLocaleString('de'));

  // Fehlerbehandlung muss hier über einen try-catch-Block erfolgen
}
```
