# Typen

## Primitive Typen

Es gibt in JavaScript sieben primitive Datentypen:

* `number`
* `string`
* `boolean`
* `null`
* `undefined`
* `bigint`
* `symbol`

Auf die beiden Typen `bigint` und `symbol` gehe ich in dieser Einführung nicht ein. Die beiden Spezialtypen `null` sowie `undefined` werden im Abschnitt [Null oder Nichts](#null-oder-nichts) behandelt.

Primitive Werte sind unveränderlich (***immutable***). Bei der Übergabe an eine Funktion wird eine Kopie des Wertes übergeben.

### Literale

Wie erzeugt man einen Wert eines primitiven Typs? Durch ein Literal!

```js
// Number
const answer = 42;
console.log(typeof answer);
// String
const language = 'JavaScript';
console.log(typeof language);
// Boolean
const jsIsFun = true;
console.log(typeof jsIsFun);
```

Im kurzen Code-Snippet habe ich Variablen eingeführt bzw. deklariert. Auf dies wird im Abschnitt [Syntax/Variablen](../syntax/variables.md) eingegangen.
Der `typeof`-Operator wird eingesetzt um den jeweiligen Datentyp zu visualisieren - in der Praxis natürlich zur Typ-Überprüfung.

#### Number

In JavaScript gibt es beim Zahl-Typ `number` keine Unterscheidung zwischen Ganzzahlen und Fließkommazahlen. Eine Zahl ist eine Zahl. Etwas technischer betrachtet gibt es in JavaScript keinen Ganzzahl-Typ, sondern der Typ `number` entspricht dem 64-bit Format IEEE 754 in doppelter Genauigkeit (siehe hier im [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) oder in der [ECMAScript Spezifikation](https://tc39.es/ecma262/#sec-ecmascript-language-types-number-type) - etwas lesbarer in der [annotierten ECMAScript 5 Spezifikation](https://es5.github.io/#x8.5)).

Literale können dezimal, binär, oktal, hexadezimal und exponential dargestellt werden.

```js
console.log(255);
console.log(0b11111111);     // 0B11111111
console.log(0377);           // 0o377, 0O377
console.log(0xFF);           // 0xff, 0Xff, 0XFF
console.log(255e0);
```

#### String

Einen speziellen Datentyp für ein einzelnes Zeichen gibt es in JavaScript nicht, hier ist alles eine Zeichenkette. Die Buchstaben (Unicode, UTF-16) werden im literalen Ausdruck in ***Quotes*** eingefasst.

```js
console.log('Eine Zeichenkette');
console.log("a");
console.log(`Eine Zeile davor ist eine Zeichenkette mit einem Zeichen`);
```

Es spielt in JavaScript keine Rolle, ob einfache Hochkommatas oder Gänsefüßchen benutzt werden. Sie unterscheiden sich lediglich beim Einfügen des Begrenzers.

```js
console.log('It\'s somewhat "crazy"!');
console.log("It's somewhat \"crazy\"!");
```

Die dritte Form mit ***back-tics*** wurde mit JavaScript 2015 eingeführt und erlaubt Mehrzeiligkeit und Interpolation von Variablen:

```js
const answer = 42;
console.log(`
    Answer to the Ultimate Question of Life,
    The Universe, and Everything: ${answer}
`);
```

> Welche Form soll nun verwendet werden? Es ist einfach nur eine Frage nach Konvention. Möglicherweise gibt es Code-Richtlinien oder persönliche Präferenzen. Siehe auch [JavaScript in Plain English](https://javascript.plainenglish.io/the-real-difference-between-single-quotes-and-double-quotes-in-javascript-3d00bf720bcd)

#### Boolean

Der Werte-Bereich des booleschen Datentyps beschränkt sich auf genau zwei Literale: `true` und `false`.

```js
const wahr = true;
console.log(typeof wahr);
console.log(typeof false);
```

### Wrapper-Klassen

Zu diesen drei primitiven Typen existiert jeweils eine Wrapper-Klasse mit spezifischen Eigenschaften und Methoden:

* `Number`
* `String`
* `Boolean`

#### Konstruktor

Mit Hilfe eines Konstruktor-Aufrufes können solche Wrapper-Objekte erzeugt werden:

```js
const zahl = new Number(42);
const engine = new String('v8');
const isPrimitive = new Boolean(false);
console.log(typeof zahl);   // object
```

Methoden und Eigenschaften dieser Wrapper-Klassen sind genau das, was man zum Beispiel unter einer klassischen String-API versteht.

```js
console.log(engine.length);
console.log(engine.toUpperCase());
```

#### Auto-Boxing

Falls literale Werte bzw. Variablen primitiven Typs in einem Objekt-Kontext benutzt werden (also ein Punkt hinter dem jeweiligen Ausdruck folgt), verpackt die JavaScript Laufzeitumgebung automatisch den primitiven Wert in einem korrespondierenden Wrapper-Objekt und stellt somit die Eigenschaften und Methoden der Wrapper-Klasse auch den primitiven Ausdrücken zur Verfügung.

```js
console.log('Eine primitive Zeichenkette'.length);
const siteGenerator = 'Docusaurus';
console.log(siteGenerator.toUpperCase());
console.log((3.2489).toPrecision(3));
```

## Objekt Typen

Alle Daten, die keine primitiven Daten sind (also keinen primitiven Typ haben), sind von einem Objekt-Typ.
Objekte sind veränderlich (***mutable***) und werden an Funktionen mit einer Referenz (Verweis) übergeben. Die bekanntesten vordefinierten Objekt-Typen sind ```Object```, ```Array``` und ```Function```.

### Objects

Objekte in JavaScript sind assoziative Abbildungen - also Schlüssel-Wert-Zuordnungen. Der Schlüssel-Typ (***Key***) ist ein `string`, der Wert-Typ (***Value***) beliebig. Die Schlüssel bezeichnet man in der OOP u.a. als Eigenschaften (***Property***).

> Mit JavaScript 2015 wurde der primitive Datentyp `symbol` eingeführt. Auch Symbole sind gültige Objekt-Keys.

#### Literale Definition

```js
const person = {
    firstname: 'Thomas',
    age: 49
};
console.log(person);
```

#### Property Zugriff

```js
console.log(person.name);
console.log(person['name']);
```

#### Property Zuweisung

```js
person.firstname = 'Marius';
person.lastname = 'Meier';      // add dynamically new property
person['age'] = 51;
```

### Arrays

Arrays in JavaScript sind ein Untertyp von `Object` mit einer speziellen Behandlung für Keys die Ganzzahlen entsprechen.

#### Literale Defintion

```js
const primzahlen = [2, 3, 5, 7, 11, 13, 17, 19];
console.log(primzahlen);
console.log(primzahlen.length); // Länge des Arrays
```

#### Element-Zugriff

```js
console.log(primzahlen[0]);     // erstes Array-Element
console.log(primzahlen[7]);     // letztes Element im obigen Array
```

#### Standard-API

```js
console.log(primzahlen.slice(4));
```

> Einige Methoden mehr gibt es im Abschnitt [Standard API/Arrays](../standard-api/arrays.md).

#### Mixed Content

Es gibt übrigens keine feste Typisierung der Array-Elemente. Also ist auch folgender gemischter Inhalt möglich:

```js
const mixedContent = [42, 'JavaScript', true, [1, 2, 3, 4]];
```

### Funktionen

Auch Funktionen sind in JavaScript spezielle Objekte, die aufrufbar sind. Sie können ebenso wie jeder andere Wert auch an Variablen zugewiesen sowie an andere Funktionen übergeben werden. Für Funktionen in JavaScript gilt, dass sie ***first-class citizens*** sind - ein Begriff aus der funktionalen Programmierung.

#### Deklaration

```js
function add(a,b) {
    return a+b;
}
console.log(add(17, 4));
```

#### Definition über einen Ausdruck

```js
const sub = function (a,b) {
    return a - b;
}
console.log(sub(17, 4));
```

#### Definition mit der Fat-Arrow-Syntax

```js
const doubleValue = (z) => z * 2;
console.log(doubleValue(21));
```

#### Übergabe an andere Funktion

```js
console.log([1,2,3,4].map(doubleValue));
```

## Null oder Nichts

JavaScript kennt zwei Werte und mit diesen jeweils formal sogar zwei eigene Datentypen für den Begriff ***"nichts"***: `null` und `undefined`.

### Undefined

Der Wert `undefined` entspricht grob dem Konzept von **nicht-existent**. Es gibt verschiedene Standard-Vorkommen in der JavaScript Laufzeit-Umgebung:

* Eine Variable, die nur deklariert wurde (also ohne Zuweisung eines Wertes) ist `undefined`.

```js
let ohneWert;
console.log(ohneWert);
console.log(typeof ohneWert);
console.log(typeof notDeclared);  // kein Fehler!
```

* Default-Rückgabe einer Funktion

```js
function noReturnValue() {}
const returned = noReturnValue();
console.log(returned);
```

* Unbekannte Eigenschaften eines Objektes

```js
const person = { firstname: 'Thomas' };
console.log(person.lastname);
```

### Null

Der `null`-Wert wird stattdessen eher benutzt, um die Nicht-Existenz eines Objektes anzuzeigen. Also in etwa das gleiche Konzept wie hinter einer leeren Zeichenkette.

```js
const person = null;
console.log(person);
console.log(typeof person);     // "object", that's a bug
```

> In der Praxis wird diese Trennung durchaus aufgeweicht.

## Typ-Umwandlung

Hier betrachte ich lediglich die relevanten Umwandlungen (***casting***) von Zahl-Werten in Zeichenketten und zurück.

### Nach Zeichenkette

```js
const zahl = 42;
let zahlStr = zahl.toString();
console.log(zahlStr, typeof zahlStr);
```

Etwas unüblich aber durchaus in der Praxis zu finden ist der Einsatz des `+`-Operators zum Verketten von Zeichenketten:

```js
zahlStr = '' + 17;
console.log(zahlStr, typeof zahlStr);
```

### Von Zeichenkette

```js
const zahlwert = '1234';
const zahl1 = +zahlwert;            // or parseFloat
const zahl2 = parseInt(zahlwert);   // or parseFloat
const zahl3 = Number(zahlwert);
const zahl4 = new Number(zahlwert);
console.log(zahl1, typeof zahl1);
console.log(zahl2, typeof zahl2);
console.log(zahl3, typeof zahl3);
```

> Im Gegensatz zur Konstruktor-Semantik erzeugt also das einfache Aufrufen der `Number`-Funktion einen primitiven Wert und kein Wrapper-Objekt.

## Typ-Überprüfung

Das häufigste Szenario für die Überprüfung von Daten-Typen ist in Funktionen das Testen der Parameter. Ansonsten *weiß* der Programmierer in der Regel, welcher Typ in einer Variablen steckt.

### Nicht übergebene Parameter

```js
function printMessage(msg) {
    if (typeof msg === 'undefined') {
        msg = '(Empty Message)';
    }
    console.log(`Message: '${msg}'`);
}
printMessage('Hello World!');
printMessage();
```

> Der Vergleichsoperator `===` wird im Abschnitt [Syntax/Gleichheit](../syntax/equality.md) erklärt.

Verschiedentlich wird auch (mit Bedacht) der logische Oder-Operator eingesetzt:

```js
function printMessage(msg, options) {
    if (typeof msg === 'undefined') {
        msg = '(Empty Message)';
    }
    options = options || { withTimestamp: false };
    console.log(`Message: '${msg}'`, options.withTimestamp);
}
printMessage('Hello World!');
printMessage('Hello JavaScript!', { withTimestamp: true });
```

> Zu den logischen Operatoren siehe Abschnitt [Syntax/Logik-Operatoren](../syntax/logical-operators.md).

### Prüfung auf Zahl-Typ

```js
function doubleValue(n) {
    if (typeof n !== 'number') {
        n = parseInt(n);
    }
    return n + n; // what about 2 * n?
}
doubleValue(17);    // 34
doubleValue('31');  // 62
doubleValue('nix'); // ??
```

Oder etwas kompakter mit der direkten Umwandlung aller Argumente:

```js
function add(a,b) {
    a = Number(a); b = Number(b);
    return a + b;
}
add('17','4');
```
