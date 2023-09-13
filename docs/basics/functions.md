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

## Scope

Bis zu ECMAScript 5.1 (aus dem Jahr 2011) gab es in JavaScript nur zwei Sichtbarkeitsbereiche:
*global* und *funktions-lokal* (also **global-scope** und **function-scope**):
- eine globale Variable wird erzeugt durch
  1. Definition einer Property auf dem globalen Objekt (`window.variable = 17`)
  2. Initialisierung einer vorher nicht deklarierten Variable (`variable = 4`)
  3. Deklaration einer Variablen im globalen Kontext (`var variable = 21`) - also nicht innerhalb
     einer Funktion.
- eine lokale Variable, deren Sichtbarkeit sich beschränkft auf eine Funktion, wird erzeugt durch
  1. Deklaration einer Variablen innerhalb einer Funktion (`var lokal = 42`)

Mit ECMAScript 6 bzw. korrekter ECMAScript 2015 wurden in JavaScript zwei weitere Scopes eingeführt:
1. Der *Block-Scope* oder auch *lexical-scope*: Variablen/Symbole, die mit dem Schlüsselwort `const`
   oder `let` deklariert werden, sind nur im jeweiligen lexikalischen Block sichtbar. Das kann jetzt
   auch ein Anweisungsblock sein.
2. Der *Module-Scope*: Variablen, die in einem Modul definiert werden (*modul-global*), sind nur
   in dem Module sichtbar. Damit andere diese Variable konsumieren können, müssen diese vom Modul
   exportiert werden.

::: info
Eine Variable ist *sichtbar*, wenn sie im aktuellen Scope oder im *umgebenden* (äußeren) Scope
sichtbar ist. Das gilt insbesondere für innere Funktionen - siehe unten
[Funktionen/Innere Funktionen](./functions#inner-functions).
:::

> Weitere Abschnitte, die sich mit dem Thema Scope beschäftigen, sind [Advanced/Hoisting](../advanced/hoisting), [Advanced/Closures](../advanced/closures) und eben [Advanced/Module](../advanced/modules).

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
