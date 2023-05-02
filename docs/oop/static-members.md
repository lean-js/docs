# Static Members

Statische Properties und Methoden haben keinen Zugriff auf Instanz-Eigenschaften und
-Methoden.

## ECMAScript 5

Um wenigstens eine Zuordnung zur Klasse zu haben, wurden statische Member als
weitere Properties auf der Konstruktor-Funktion definiert. Prinzipiell sind statische
Member nichts weiter als globale freie Member.

```js
function Klasse() {
  this.instanceProp = 17;
}
Klasse.prototype.instanceMethod = function () {
  // Access static props
  const value = Klasse.staticProp;
  Klasse.staticFunc();
};

Klasse.staticProp = 42;
Klasse.staticFunc = function () {
  Klasse.staticProp += 1;
};
```

## ECMAScript 2015 und 2022

Statische Methoden wurden schon mit ECMAScript 2015 standardisiert, statische Properties
inclusive privater statischer Member werden erst mit ECMASCript 2022 im Standard formuliert.

```js
class Klasse {
  static staticProp = 42; // ECMAScript 2022
  static #privateStatic = 17; // ECMAScript 2022

  static staticMethod() {} // ECMAScript 2015
  static #privateMethod() {} // ECMAScript 2022
}
```

::: warning
Es gibt einige Fallstricke der _private_ Member beim Zugriff von Kind-Klassen aus. Insbesondere gibt es auch (noch) keine Entsprechung für eine _protected_ Kapselung.
Siehe hierzu im [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields).
:::
