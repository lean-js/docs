
# Evolution von JavaScript I: Summe

## Problem-Beschreibung

Es soll eine Funktion entwickelt werden, die eine variable Anzahl von `number` - Argumenten entgegennimmt und deren Summe zurück gibt.

## Lösungen

### ES5 - Legacy Way

```js
function summe1() {
  var summe = 0;
  for (var i = 0; i < arguments.length; i++) {
    summe += arguments[i];
  }
  return summe;
}
```

### ES5 - Nerdy Way

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

### ES5 - Functional Way

```js
function summe3() {
  var zahlen = Array.prototype.slice.call(arguments);
  var summe = zahlen.reduce(function (current, next) {
    return current + next;
  }, 0);
  return summe;
}
```

### ES6 - Iterator und for-of

```js
function summe4() {
  const summe = 0;
  for (const z of arguments) {
    summe += z;
  }
  return summe;
}
```

### ES6 - Iterator und Array.from

```js
function summe5() {
  const zahlen = Array.from(arguments);
  const summe = zahlen.reduce((current, next) => current + next, 0);
  return summe;
}
```

### ES6 - Iterator und Spread

```js
function summe6() {
  const zahlen = [...arguments];
  const summe = zahlen.reduce((current, next) => current + next, 0);
  return summe;
}
```

### ES6 - Rest Operator

```js
function summe7(...zahlen) {
  const summe = zahlen.reduce((current, next) => current + next, 0);
  return summe;
}
```

### ES6 - Einzeiler mit Fat-Arrow

```js
const summe8 = (...zahlen) => zahlen.reduce((current, next) => current + next, 0);
```
