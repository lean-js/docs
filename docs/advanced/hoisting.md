# Hoisting

Der idiomatische JavaScript-Begriff **hoisting** bezieht sich auf das Verhalten des Interpreters,
Deklarationen von Variablen/Funktionen an den Beginn des Gültigkeitsbereiches "hochzuziehen".

Wie mein Code aussieht:

```js
console.log('Starting point');

var topic = 'Hoisting';

function prettyPrint(msg) {
  console.log(`[${new Date().toLocaleTimeString('de')}] ${msg}`);
}

prettyPrint(topic);
```

Wie JavaScript den Code sieht:

```js
var topic;

function prettyPrint(msg) {
  console.log(`[${new Date().toLocaleTimeString('de')}] ${msg}`);
}

console.log('Starting point');

topic = 'Hoisting';

prettyPrint(topic);
```

## Nützliches Beispiel

Tatsächlich gibt es in der Realität ein Szenario bei dem Entwickler gerne Hoiting einsetzen (es
ist nicht unbedingt gebräuchlich und hängt stark vom Code-Stil des Entwicklers ab):

```js:line-numbers
debug('Programmstart');           // called before declaration at line 8

// some code
// ...

debug('Programmende');            // called before declaration at line 8

function debug(msg) {
  console.log(formatter(msg));    // called before declaration at line 11

  function formatter(msg) {
   return `[${new Date().toLocaleTimeString('de')}] ${msg}`;
  }
}

var notWorkingDebugFn = (msg) => {
  console.log(`[${new Date().toLocaleTimeString('de')}] ${msg}`);
}
```

Hilfsfunktionen werden so *aus den Augen geschoben* an das Ende des Codes. Das funktioniert nicht
mit Funktionen die über einen Ausdruck definiert und an eine Variable zugewiesen werden - denn die
Deklaration der Variablen (und nur diese!) wird hochgezogen.

## Fallstrick

Mitunter entstehen schwer zu findende Fehler, wenn Hoisting ungewollt auftritt:

```js:line-numbers
var globalVar = 21;

function problematicFn() {
  console.log(globalVar);
  var globalVar = 42;
}

problematicFn();    // What will be logged to console?
```

Dieses Beispiel *funktioniert* nur, weil mindestens zwei Anti-Patterns der JavaScript-Programmierung
verwendet werden.

1. Die Verwendung von globalen Variablen
2. Das Deklarieren der Variablen mit `var` (`let` oder `const` hätten einen Error erzeugt)
