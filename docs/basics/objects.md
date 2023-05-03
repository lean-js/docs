# Objekte

## Literale Objekte

### Literale Definition

```js
// Leeres Objekt
const emptyObject = {};
const ebensoLeer = new Object(); // unüblich

// Objekt mit Properties
const environment = {
  browser: true,
  agent: 'Chrome',
};
```

### Shorthand Properties

```js
const firstname = 'Douglas';
const lastname = 'Crockford';
const person1 = { firstname: firstname, lastname: lastname };
const person2 = { firstname, lastname };
```

### Property Zugriff

```js
// Reading
console.log(environment.agent);
console.log(environment['browser']);
// Writing
environment.agent = 'Node.js';
environment['browser'] = false;
```

### Dynamische Properties

```js
// Adding
environment.version = 85;
// Removing
delete environment.browser;
```

## Methoden

### Logik in Objekten

In der OOP können an Objekte Nachrichten gesendet werden, die u.a. den Status/State des Objektes mutieren. In vielen OOP-Sprachen wird dies durch Methoden realisiert.

In JavaScript ist eine Objekt-Eigenschaft, deren Value eine Funktion ist, eine Methode.

```js
const environment = {
  browser: true,
  agent: 'Chrome',
  print: function () {
    console.log('Browser-Name: ' + this.browser);
  },
};

environment.print();
```

Die Besonderheit im Methodenrumpf ist das Schlüsselwort `this`. Dieses referenziert bei der Ausführung als Methode (also über den Objektnamen mit dem Punkt-Operator) das Objekt selbst.

Mit JavaScript 2015 wurde auch eine elegantere Syntax für Methoden-Properties eingeführt:

```js
const environment = {
  browser: true,
  agent: 'Chrome',
  print() {
    console.log('Browser-Name: ' + this.browser);
  },
};

environment.print();
```

## Cloning

```js
const objekt = {
  propA: 17,
  propB: 'Message',
};
```

### Referenzen

```js
const refKopie = objekt;
console.log(objekt);
console.log(refKopie);
objekt.propA = 21;
refKopie.propB = 'Nachricht';
console.log(objekt);
console.log(refKopie);
// Es gilt
console.log(objekt === refKopie); // true
```

### Manuell Kopieren

```js
const manuelleKopie = {
  propA: objekt.propA,
  propB: objekt.propB,
};
console.log(objekt);
console.log(manuelleKopie);
objekt.propA = 47;
manuelleKopie.propB = 'New Message';
console.log(objekt);
console.log(manuelleKopie);
// Es gilt
console.log(objekt === manuelleKopie); // false
```

### ECMAScript 5: Object.assign

```js
// leeresObjekt enthält nach dem assign-Auruf die kopierten Properties
const leeresObjekt = {};
Object.assign(leeresObjekt, objekt);

// Normale Verwendung
const assignKopie = Object.assign({}, objekt);
```

### ECMAScript 6: Spread

Eingeführt mit JavaScript 2015 und heutzutage Best-Practice.

```js
const kopie = { ...objekt };
const kopieMitChangedProp = { ...objekt, propA: 777 };
const kopieMitNeuerProp = { ...objekt, propC: 0 };

// Der Spread funktioniert auch mit Arrays

const zahlen = [1, 2, 3, 4];

// Old-School Kopie
const zahlenKopieOldSchool = zahlen.slice();
// Spread
const zahlenKopie = [...zahlen];
```

> Alle hier vorgestellten Clone-Mechanismen erzeugen immer nur eine flache Kopie.
