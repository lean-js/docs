# Das Schlüsselwort `this`

In JavaScript ist `this` ein Schlüsselwort, dass kontext-abhängig einen Wert hat!
Siehe [Annotated ES 5](https://es5.github.io/#x11.1.1).

Als Ausgangspunkt nehmen wir folgende einfache Funktion:

```js
function printThis() {
  console.log(this);
}
```

## Kontext

### OOP, Object Kontext

Bei der Verwendung der Funktion als Methode in einem Objekt zeigt `this` eben auf dieses Objekt:

```js
const obj = {
  prop: 'Ich bin ein Objekt',
  methode: printThis
}

obj.methode();
```

### Globaler Kontext

Im globalen Kontext - wenn die Funktion also *frei* aufgerufen wird - zeigt `this` auf das
globale Objekt:

```js
printThis();
```

Das widerspricht gar nicht so sehr dem Objekt-Kontext, wenn man die Zeile wie folgt schreibt:

```js
window.printThis();
```

### Event Handler

In einem Event-Handler zeigt `this` auf das Element, das den Event-Listener zugewiesen bekommen
hat (`currentTarget`).

```js
const elt = ...;
elt.addEventListener('click', printThis);
```

Aber auch hier kann man sich den Legacy-Code dazu anschauen:

```js
const elt = ...;
elt.onclick = printThis;
```

### Innere Funktionen

Hier *erbt* die innere Funktion ganz einfach den äußeren Scope.

```js
const obj = {
  prop: 'Ich bin ein Objekt',
  methode: function () {
    function printThis() {
      console.log(this);
    }
    printThis();
  }
}
```

## Setting the this-Binding

### Call and Apply

Jede Funktion in JavaScript ist auch ein Objekt, dass unter anderem über die beiden Methoden
**call** and **apply** verfügt. Über diese beiden können Funktionen ebenfalls aufgerufen werden und
dabei zusätzlich das **thisBinding** verändert werden.

```js
const objA = {
  prop: 21,
  print: function (prefix) { console.log(`${prefix} ${this.prop}`)}
}

objA.print('Value:');

const objB = {
  prop: 42
}

objA.print.call(objB, 'Wert:');
objA.print.apply(objB, ['Ergebnis:']);
```

Die Bedeutung und Nutzung beider Methoden ist in heutiger Zeit für den End-Entwickler durch
Neuerungen in der Sprache JavaScript zurückgegangen.

### Bind

Mit der **bind**-Methode kann ich *Currying* oder *Schönfinkeln* erreichen. Auch diese Methode
wird außerhalb von komplexen JavaScript-Bibliotheken eher selten in produktivem JavaScript-Code
zu finden sein.

```js
function add(a,b) { return a+b; }

const addTo5 = add.bind(null, 5);

console.log(addTo5(17));
```

Das **thisBinding** auf `null` gesetzt, bedeutet dass das globale Objekt benutzt wird. Hier also
keine Veränderung.

## Fat Arrow

In Fat-Arrow-Funktion ist das **thisBinding** immer(!) auf den äußeren Kontext gesetzt und fest
gebunden. Es kann auch nicht durch eine der obigen Methoden verändert werden.

::: warning
Ein Fat-Arrow kann deshalb niemals als Methode in einem Objekt benutzt werden. Auch als Event-Handler
Funktion zeigt er damit nicht auf das `currentTarget`.
:::

::: info
In einigen Szenarien erlaubt die Verwendung des Fat-Arrow das Vermeiden von Closures. Generell
sollte aber das Keyword `this` außerhalb der OOP vermieden werden.
:::
