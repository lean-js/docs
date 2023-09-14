# Properties

## Getter/Setter

In ECMAScript 5 wurde die Getter/Setter-Semantik eingeführt.

```js
const konto = {
  nr: 1001,
  _stand: 0,
  _dispo: 0,

  get stand() { return this._stand; },

  get dispo() { return this._dispo; },
  set dispo(value) { this._dispo = value; },

  einzahlen: function (betrag) {
    this.stand += betrag;
  },
  auszahlen: function (betrag) {
    if (betrag > this.stand + this.dispo) {
      return false;
    }
    this.stand -= betrag;
    return true;
  },
};
```

## Property Descriptors

Neben der einfachen *key-value* Zuordnung können Eigenschaften in JavaScript können auch über einen **Property Descriptor** detaillierter beschrieben werden.

```js
const obj = {};

Object.defineProperty(obj, 'nr', {
  value: 1002,
  writable: false,     // If false, value is read only.
  enumerable: true,    // If false, property is not iterated (for-of, spread, ...)
  configurable: false  // If false, property descriptor is not changeable
});

Object.defineProperty(obj, '_stand', { writable: true });
Object.defineProperty(obj, 'stand', {
  get() { return this._stand; },
  set(value) { this._stand = value; },
  enumerable: true
});
```

Mehrere Properties können über ```Object.defineProperties``` gesetzt werden.

Ausführliche Erklärung dazu im [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) oder direkt in der [ECMAScript Spezifikation](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-property-attributes).
