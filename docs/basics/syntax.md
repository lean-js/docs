# Syntax

## Anweisungen

### Anweisungsende: Semikolon

Eine JavaScript-Anweisung kann sich über mehrere Zeilen verteilen und wird abgeschlossen durch ein Semikolon.

```js
console.log(`
    Das ist ein mehrzeiliger String.
`);
console
    .log('Eigenwillige, aber korrekte Formatierung');
```

### Einrückungen

Einrückungen und zusätzlicher Leeraum (Leerzeichen, Tabulator-Zeichen, Zeilenwechsel) spielen im Quellcode keine Rolle und sollen lediglich die Lesbarkeit erhöhen.

```js
const isImportant = true;
if (isImportant)
    console.log('It\'s important.');
console.log('Printed anyway);
```

### Anweisungsblöcke

Statt einer einzelnen Anweisung kann auch ein Anweisungsblock stehen. Häufigste Verwendung ist bei der strukturierten Programmierung (bedingte und wiederholte Ausführung).

```js
const isVeryImportant = true;
if (isVeryImportant) {
    console.log('It\'s important.');
    console.log('Got it? Important!');
}
```

### ASI

Ein kleiner Fallstrick und Gegenstand jahrelanger Diskussionen in der JavaScript-Welt ist die **ASI (Automatic semicolon injection)**. Der JavaScript-Interpreter fügt an gegebener Stelle für uns Semikolons ein - falls wir sie vergessen haben (?!).

```js
function add(a,b) {
    result = a + b
    return {
        result: result
    }
}
console.log(add(17,4))
```

## Kommentare

JavaScript unterscheidet zwischen zwei Kommentarformen: einzeiligem und mehrzeiligem Kommentar

### Einzeiliger Kommentar

In einer Zeile wird der Kommentar eingeleitet durch `//` und endet automatisch mit dem Ende der Zeile.

```js
// Einfache Ausgaben über die Konsole
console.log('Hallo Welt');  // Zum Anschauen dieser Ausgabe: Entwicklertools
```

### Mehrzeiliger Kommentar

Falls ein längerer Kommentar über mehrere Zeilen erstellt werden soll, kann der
Text in Kommentarklammern eingefasst werden `/* .... */`.

```js
/*
 * Der Stern hier vorne hat keine Bedeutung,
 * er dient lediglich dem schicken Aussehen.
 */
```

> Auf mehrzeiligen Kommentar sollte zwischen Anweisungen verzichtet werden. Dort sollte er eher zum Ein- und Auskommentieren von Code-Blöcken genutzt werden.

```js
console.log('Eine Nachricht');
/*
    console.log('Früher wurde auch das ausgegeben');
    console.log('Aber es war eher unwichtig.'); // Aber eben nicht für alle
    console.log('Ich will es aber im Code stehen lassen.');
*/
```

### JSDoc

Sinnvoller ist mehrzeiliger Kommentar vor der Definition von Funktionen und Klassen. Und zwar in seiner speziellen JSDoc-Form. Siehe: [JSDOC](https://jsdoc.app/).

```js
/**
 * Add two numbers
 *
 * @param {number} a - First operand.
 * @param {number} b - Second operand.
 */
function add(a, b) {
    return a+b;
}
```

## Variablen

### Deklaration

Variablen werden mit den Schlüsselwörtern `let` und `const` deklariert.

```js
let counter = 0;
counter = 1;

const maximum = 10;

// maximum = 100;
// Neu-Zuweisung, Fehler!
```

Vor JavaScript 2015 wurden Variablen ausschließlich mit dem Schlüsselwort `var` deklariert. Dies sollte heute vermieden werden.

```js
const bedingung = true;
if (bedingung) {
    let tempVar = 21;   // Scoped to block
    var globalVar = 21; // Not scoped, but global
}
console.log(typeof tempVar);   // undefined
console.log(typeof globalVar); // number
```

### Konstante Objekte und Arrays

Objekte und Arrays, die konstanten Variablen zugewiesen werden, bleiben weiter veränderbar (***mutable***). Konstant ist lediglich die Variable, also der Verweis auf das Objekt bzw. Array.

```js
const person = {
    firstname: 'Markus'
};
const primzahlen = [2, 3, 5, 7];
person.firstname = 'Klaus';
person.lastname = 'Lage';
primzahlen.push(11, 13, 17, 19);
console.log(person);
console.log(primzahlen);
```

## Ausdrücke und Operatoren

### Ausdruck / Expression

Ein JavaScript-Ausdruck "steht" für einen Wert. Die einfachste Form ist ein literaler primitiver Wert.

```js
42;
```

Natürlich ist auch eine Variable oder die Rückgabe einer aufgerufenen Funktion ein Ausdruck:

```js
const zahl = '17';
zahl;
parseInt(zahl);
```

### Operatoren

Ausdrücke können mit Operatoren kombiniert werden und liefern neue Werte. JavaScript kennt gängige mathematische, bit-weise, relationale und logische Operatoren.

```js
// Mathematische Operatoren
let summe = 0;
summe = 17 + 4;
summe = summe + 42;
summe += 21; // increment by twentyone
summe++; // increment by one
const average = summe / 5;

// Bit-weise Operatoren
const verdoppelt = summe << 1;
const erstesBit = summe & 1;

// Relationale Operatoren
const groesserAls = 17 > 4; // true

// Logische Operatoren
const logischesUnd = true && false; // false
```

> Zu den logischen Operatoren gibt es einen Unterabschnitt [Syntax/Logische Operatoren](../syntax/logical-operators.md).

Zeichenketten-Verknüpfungen werden ebenfalls mit dem `+` Operator durchgeführt.

```js
const name = 'Thomas' + ' ' + 'Müller';
name += ' (Fussballspieler)';
```

Falls einer nur der beiden Operanden vom Typ `string` ist, wird trotzdem eine Zeichenketten-Verknüpfung durchgeführt (der zweite also automatisch in seine Zeichenkette überführt - **toString**-Aufruf). Anders bei den anderen mathematischen Operatoren, hier wird versucht eine Konvertierung nach `number` durchzuführen.

```js
console.log('17' + 4);
console.log('17' * 4);
```

## Gleichheit

Um die Gleichheit von zwei Werten zu überprüfen, existieren in JavaScript zwei(!) Operatoren:

* `===`: strikte, typsicherer Gleichheit mit drei Gleichheitszeichen
* `==`: lockere bzw. abstrakte Gleicheit mit Typ-Erzwingung

### Strict Equality

Es ist dringend angeraten immer diese strikte Form der Gleichheitsprüfung zu verwenden. Das Wörtchen immer impliziert hier natürlich: keine Regel ohne Ausnahme.

```js
// Primitive Werte
console.log('Hallo' === 'Hallo');   // true
console.log(0 === false);           // false
console.log(1 === true);            // false
console.log(null === undefined);    // false

// Objekte
const primzahlen = [2,3,5];
console.log(primzahlen === primzahlen); // true
console.log(primzahlen == [2,3,4]);     // false
```

### Loose Equality

Aus Bequemlichkeit ist es verschiedentlich durchaus erlaubt, nur locker zu prüfen. Man sollte sich der Konsequenzen bewusst sein.

```js
console.log(5 == '5');              // true
console.log(0 == false);            // true
console.log('' == false);           // true
console.log([] == false);           // true
console.log({} == false);           // false
console.log(null == false);         // false
console.log(undefined == false);    // false
```

## Logische Operatoren

### Binäre Logik

Die logischen Operatoren in JavaScript sind:

* `&&` - logisches Und
* `||` - logisches Oder
* `!`  - logisches Nicht

Alle drei führen eine Typ-Konvertierung nach `boolean` für nicht boolesche Werte durch (**coercion**). Das kann bewusst idiomatisch eingesetzt werden, aber auch zu Verwirrung führen.

#### Truthiness

Ein Wert gilt als **truthy**, wenn seine Coercion zu `true` führt. Alle anderen Werte sind **falsy**. Siehe hierzu [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

Für die einzelnen Datentypen sind folgende Werte **falsy**:

* **`boolean`**: `false`
* **`number`**: `0`, `-0`, `NaN`
* **`string`**: `''`
* Und außerdem: `null` und `undefined`

#### Logisches Nicht

Wir benutzen das logische Nicht um einen **truthy**-Wert nach `false` umzuwandeln und umgekehrt.

```js
console.log(!true)
console.log(!false)

console.log(!0)
console.log(!42)

console.log(!'')
console.log(!'hello')

// Sometimes unexpected:
console.log([] == false)
console.log(![])
```

#### Logisches Und

Der binäre logische Und-Operator (`&&`) bekommt zwei Operanden und es gilt:

* Ist der erste Operand **falsy**, evaluiert der Ausdruck zu dem ersten Operanden.
* Ist der erste Operand **truthy**, evaluiert der Ausdruck zu dem zweiten Operanden.

```js
console.log(true && false); // false
console.log(42 && 'hello'); // 'hello'
console.log(0 && 42);       // 0
```

> Es ist also keinesfalls so, dass der Wert des Ausdrucks vom Typ `boolean` ist.

#### Logisches Oder

Der binäre logische Oder-Operator (`||`) bekommt zwei Operanden und es gilt:

* Ist der erste Operand **truthy**, evaluiert der Ausdruck zu dem ersten Operanden.
* Ist der erste Operand **falsy**, evaluiert der Ausdruck zu dem zweiten Operanden.

```js
console.log(true || false); // true
console.log(42 || 'hello'); // 42
console.log(0 || 42);       // 42
```

> Auch hier ist natürlich der Wert des Ausdrucks nicht zwingend vom Typ `boolean`.

#### Kurz-Schluss

Beide Operatoren arbeiten im Kurz-Schluss-Verfahren (***short-circuiting***):

* `&&`: Ist er erste Operand schon **falsy**, wird der zweite nicht mehr evaluiert. Eventuelle Nebeneffekte passieren demnach nicht.
* '||': Ist der erste Operand schon **truthy**, wird der zweite genauso nicht mehr evaluiert.

```js
let counter = 1

console.log(false && counter++);
console.log(counter);

console.log(true || counter++);
console.log(counter);
```

### Sonderformen

#### Ternärer Operator

Abhängig von der **truthy/falsy**-Auswertung des ersten Operanden, evaluiert der Ausdruck zum zweiten bzw. dritten Operanden.

```js
const a = 17, b = 4;
const max = a > b ? a : b;
```

#### Nullish-Coalescing (Vereinigung)

Ist der erste Operand `null` oder `undefined`, evaluiert der Ausdruck zum zweiten Operanden.

```js
const firstOp = null;
console.log(firstOp ?? 42);
const firstNumber = 0;
console.log(firstNumber ?? 42);

// Zur Erinnerung:
console.log(firstOp || 42);
console.log(firstNumber || 42);
```

## Bedingte Ausführung

JavaScript verfügt über zwei Schlüsselwörter, um bedingte Code-Ausführung zu realisieren:

* **`if-else`**: Einfache Fallunterscheidung
* **`switch`**: Mehrfach Fallunterscheidung

## Wiederholte Ausführung

Es gibt in JavaScript eine Vielzahl von Schleifen-Varianten mit jeweils unterschiedlichen Verwendungsszenarien.

### Schleifen mit Abbruchkriterium

* **`while`**: Test am Kopf der Schleife
* **`do while`**: Test am Ende der Schleife
* **`for`**: klassische Zählschleife

### Iteration über Objekt-Eigenschaften

* **`for-in`**: Schleife über alle (!) aufzählbaren Eigenschaften eines Objektes.

### Iteration über Arrays

* **`for-of`**: Schleife über ***iterable*** Objekte. Nicht nur Arrays!
* **`forEach`**: Instanz-Methode von Arrays
