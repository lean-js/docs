# Funktionen

## Deklaration/Definition

Funktionen können auf drei verschiedene Arten erzeugt werden:

- **`function`**-Schlüsselwort und Deklaration
- **`function`**-Schlüsselwort in Ausdrücken
- **fat-arrow**-Syntax in Ausdrücken

### Funktions-Deklaration

```js
function doubleValue(z) {
  return z * 2;
}
```

### Funktions-Ausdruck / Anonyme Funktion

```js
const tripleValue = function (z) {
  return z * 3;
};
```

### Fat-Arrow Syntax

```js
const halfValue = (z) => {
  return z / 2;
};
const add = (a, b) => a + b;
```

Auch wenn es Unterschiede bei den drei Varianten gibt (Hoisting, **this**-Bindung), können sie in der Regel gleichartig benutzt werden.

## Argumente

### Optional und Default-Werte

Argumente sind immer optional (von rechts nach links) und können Default-Werte haben:

```js
function demoFunction(arg1, arg2 = 'world', arg3) {
  console.log(arg1, arg2, arg3);
}

myFunction('hello'); // "hello", "world", undefined
```

### Variable Argumente-Liste / Argumente-Array

Wir können alle übergebenen Argumente mit der **_rest_**-Syntax `...` in einem Array konsumieren.

Zudem verfügen Funktionen, die über das `function`-Schlüsselwort definiert werden, auch über ein `arguments`-Objekt im Scope (Das gilt also nicht für die Fat-Arrow-Syntax).

> Die bessere Praxis ist es aber immer, die _rest_-Syntax zu benutzen.

```js
function variableArgsFunction(arg1, ...rest) {
  console.log(arg1, rest);
  console.log(arguments);
  console.log(rest instanceof Array, arguments instanceof Array);
}

variableArgsFunction('hello', 'a', 'b', 'c');
```

## Rückgabe

### Single Return Value

Funktionen können einen einzelnen Wert zurückgeben - per Default `undefined`.

```js copy
function returnHello() {
  return 'Hello';
}

function returnUndefined() {
  return undefined;
}

function returnUndefinedImplicit() {
  return;
}

function noReturnButUndefined() {}
```

### Multiple Values

Um mehrere Werte zurückzugeben, müssen diese als Objekt oder Array zurückgebeben werden.

## Funktionen sind Objekte

In JavaScript ist jede Funktion auch *nur* ein Objekt.

```js
function add(a,b) { return a + b; }

console.log(add.length);
console.log(add.name);
console.log(add.toString());
```

Insbesondere gibt es sogar einen Funktions-Konstruktor:

```js
const sub = new Function('x','y','return x+y;');
console.log(sub(17,4));
```

## Innere Funktionen {#inner-functions}

Funktionen können auch innerhalb von anderen Funktionen definiert werden (sowohl über eine
Deklaration als auch über einen Funktions-Ausdruck). Ihre Sichtbarkeit (**scope**) beschränkt
sich dann auf die Funktion.

```js
function outerFn() {
  function innerFn1() {}
  const innerFn2 = function() {};
  const innerFn3 = () => {};

  // Alle drei inneren Funktionen sind hier sichtbar
}

// Keine der inneren Funktionen ist hier sichtbar
```

## Funktionen sind First-Class-Citizens

Funktionen in können als Ausdruck überall verwendet werden, wo in JavaScript Ausdrücke
erlaubt sind. Insobesondere also bei der Zuweisung an Variablen, bei der Übergabe von
Argumenten an andere Funktionen oder auch als Rückgabe-Wert.

### High Order Functions

Funktionen höherer Ordnung sind Funktionen, die andere Funktionen als Argument bekommen.

```js
function doSomething(callback) {
  // ...

  callback(42);
}

doSomething((value) => {
  console.log('Done', value);
});
```

### Function Factory

Wir können also auch eine Funktion in einer anderen zusammenbauen und zurückgeben.

```js
function createHider(elt) {
  function hideElt() {
    elt.style.display = 'none';
  }
  return hideElt;
}
```
