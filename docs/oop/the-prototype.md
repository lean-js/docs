# The Prototype

Problem der literalen Objekte ist die Redundanz der Objekt-Methoden.

```js
const konto1 = {
  nr: 1001,
  stand: 0,
  einzahlen(betrag) {
    this.stand += betrag;
  },
  auszahlen(betrag) {
    if (betrag > this.stand) {
      return false;
    }
    this.stand -= betrag;
    return true;
  },
};

const konto2 = {
  nr: 1001,
  stand: 0,
  einzahlen(betrag) {
    this.stand += betrag;
  },
  auszahlen(betrag) {
    if (betrag > this.stand) {
      return false;
    }
    this.stand -= betrag;
    return true;
  },
};
```

### Das Prototyp-Objekt

Jedes JavaScript-Objekt verfügt über eine Referenz auf ein Prototyp-Objekt, dass beim
lesenden Property-Zugriff ebenso konsultiert wird. (Keine Regel ohne Ausnahme: [MDN Null Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#custom_and_null_objects))

```js
const kontoPrototyp = {
  einzahlen(betrag) {
    this.stand += betrag;
  },
  auszahlen(betrag) {
    if (betrag > this.stand) {
      return false;
    }
    this.stand -= betrag;
    return true;
  },
};

const konto1 = {
  __proto__: kontoPrototyp,
  nr: 1001,
  stand: 0,
};

const konto2 = Object.create(kontoPrototyp);
konto2.nr = 1002;
konto2.stand = 0;

const konto3 = Object.create(kontoPrototyp, {
  nr: { value: 1003, enumerable: true },
  stand: { value: 0, enumerable: true, writable: true },
});
```

Die kurze Schreibweise für `konto1` oben wurde erst mit ECMAScript 2015 - war aber
in den meißten Browsern (Ausnahme IE <= 8) möglich.

### Prototype Chain

Beim lesenden Zugriff auf Properties eines Objektes wird die sogenannte Prototypen-Kette
durchlaufen, schreibender Zugriff geschieht immer am Objekt selbst.

```js
const masterPrototype = { answer: 42 };
const basePrototype = Object.create(masterPrototype, {
  base: { value: 'Question', enumerable: true, writable: true },
});

const obj1 = {
  __proto__: basePrototype,
  value: 17,
};
const obj2 = {
  __proto__: basePrototype,
  value: 4,
};

console.log(obj1.value); // 17
console.log(obj1.base); // 'Answer'
console.log(obj1.answer); // 42

obj2.answer = 21;

console.log(obj2.value); // 17
console.log(obj2.base); // 'Answer'
console.log(obj2.answer); // 21

console.log(obj2.hasOwnProperty('answer')); // true
console.log(obj1.hasOwnProperty('answer')); // false
```
