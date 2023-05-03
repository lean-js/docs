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

### Funktions-Ausdruck

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

Wir können alle übergebenen Argumente in einem Array konsumieren mit der **_rest_**-Syntax `...`:

Zudem verfügen Funktionen, die über das `function`-Schlüsselwort definiert werden, auch über ein `arguments`-Objekt im Scope.

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

## Scope

::: danger
Abschnitt fehlt noch
:::

## Hoisting

::: danger
Abschnitt fehlt noch
:::

## High Order Functions

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

## Innere Funktionen

::: danger
Abschnitt fehlt noch
:::

## Closures

### Begriff

- [Larry Wall in 'Programming Perl'](https://www.cs.ait.ac.th/~on/O/oreilly/perl/prog/ch04_03.htm#:~:text=Closure%20is%20a%20notion%20out,called%20outside%20of%20the%20context.&text=You%20can%20also%20think%20of,subroutine%20template%20without%20using%20eval.): Closure is a notion out of the Lisp world that says if you define an anonymous function in a particular lexical context, it pretends to run in that context even when it's called outside the context.
- [Perl FAQ](http://perldoc.perl.org/perlfaq7.html#What%27s-a-closure?): Closure ist ein Begriff aus der Programmierung, der präzise definiert aber schwer zu beschreiben ist. :-)
- [Wikipedia](<https://de.wikipedia.org/wiki/Closure_(Funktion)>): Eine Closure (oder Funktionsabschluss) ist ein Konzept aus der funktionalen Programmierung. Es beschreibt eine anonyme Funktion, die Zugriffe auf ihren Erstellungskontext enthält.

### Erzeugung

Eine Closure wird erzeugt, wenn in JavaScript eine innere Funktion erstellt wird (Funktion in einer Funktion) und diese

1. eine (oder mehrere) lokale Variable(n) der äußeren Funktion nutzt und
2. aus ihrem Erstellungskontext (äußere Funktion) weitergegeben wird über eine Rückgabe (return) oder als Argument an eine andere Funktion.

## Kontext (this)

### Ausgangspunkt: Funktion und Auruf

## Evolution von JavaScript I: Summe

### Problem-Beschreibung

Es soll eine Funktion entwickelt werden, die eine variable Anzahl von `number` - Argumenten entgegennimmt und deren Summe zurück gibt.

### Lösungen

#### ES5 - Legacy Way

```js
function summe1() {
  var summe = 0;
  for (var i = 0; i < arguments.length; i++) {
    summe += arguments[i];
  }
  return summe;
}
```

#### ES5 - Nerdy Way

```js
function summe2() {
  var summe = 0;
  var zahlen = Array.prototype.slice.call(arguments);
  zahlen.forEach(function z() {
    summe += z;
  });
  return summe;
}
```

#### ES5 - Functional Way

```js
function summe3() {
  var zahlen = Array.prototype.slice.call(arguments);
  var summe = zahlen.reduce(function (current, next) {
    return current + next;
  }, 0);
  return summe;
}
```

#### ES6 - Iterator und for-of

```js
function summe4() {
  const summe = 0;
  for (const z of arguments) {
    summe += z;
  }
  return summe;
}
```

#### ES6 - Iterator und Array.from

```js
function summe5() {
  const zahlen = Array.from(arguments);
  const summe = zahlen.reduce((current, next) => current + next, 0);
  return summe;
}
```

#### ES6 - Iterator und Spread

```js
function summe6() {
  const zahlen = [...arguments];
  const summe = zahlen.reduce((current, next) => current + next, 0);
  return summe;
}
```

#### ES6 - Rest Operator

```js
function summe7(...zahlen) {
  const summe = zahlen.reduce((current, next) => current + next, 0);
  return summe;
}
```

#### ES6 - Einzeiler mit Fat-Arrow

```js
const summe8 = (...zahlen) => zahlen.reduce((current, next) => current + next, 0);
```
