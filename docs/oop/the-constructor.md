# The Constructor

## Konstruktor-Funktion

Um Objekte vereinfacht anzulegen, lassen sich auch in JavaScript Konstruktoren definieren. Im
Grunde kann jede JavaScript-Funktion als Konstruktor dienen, denn dem Funktionsaufruf wird
das Schlüsselwort new vorangestellt, zurückgeben wird dann immer ein neu angelegtes Objekt.

```js
function Konto(nr) {
  this.nr = nr;
  this.stand = 0;
}

const k1 = new Konto(1001);
const k2 = new Konto(1002);
```

## Konstruktor-Prototyp

Um die Methoden-Redundanz zu vermeiden, werden Methoden auf der `prototype`-Property
der Konstruktor-Funktion definiert. Dieses Objekt wird bei der Instanziierung auf die
`__proto__`-Property der Instanz gesetzt.

```js
function Konto(nr) {
  this.nr = nr;
  this.stand = 0;
}
Konto.prototype.einzahlen = function (betrag) { this.stand += betrag; };
Konto.prototype.auszahlen = function (betrag) {
  if (betrag > this.stand) {
    return false;
  }
  this.stand -= betrag;
  return true;
};

const k1 = new Konto(1001);
const k2 = new Konto(1002);

k1.einzahlen(200);
console.log(k1.stand); // 200
console.log(k2.stand); // 0
```

## instanceof-Operator

Der `instanceof`-Operator prüft, ob die Prototype-Property der Konstruktor-Funktion/Klasse
in der Prototype-Chain des Objektes existiert.

```js
// Klasse: Base
function Base() {}

const obj = Object.create(Base.prototype);
console.log(obj instanceof Base); // true
```

## new-Schranke

Zur Sicherstellung, dass eine Konstruktor-Funktion nur über `new` aufgerufen wird,
lässt sich eine Schranke implementieren:

```js
function Konto(nr) {
  if (!(this instanceof Konto)) {
    throw TypeError(`Class constructor Konto cannot be invoked without 'new'`);
  }
}
```

## new-Semantik

Die Semantik des new-Operators kann auch einfach nachgebaut werden:

```js
// Klasse: Konto
function Konto(nr) {
  this.nr = nr;
  this.stand = 0;
}
Konto.prototype.einzahlen = function (betrag) { this.stand += betrag; }

function create(Klasse, ...args) {
  // Create empty object with prototype
  const instance = Object.create(Klasse.prototyp);
  // Call constructor function on object
  Klasse.apply(instance, args);
}

const obj1 = new Konto(1001);
const obj2 = create(Konto, 1002)
```
