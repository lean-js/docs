# Scope

## ECMAScript 5

Bis zu ECMAScript 5.1 (aus dem Jahr 2011) gab es in JavaScript nur zwei Sichtbarkeitsbereiche:
*global* und *funktions-lokal* (also **global-scope** und **function-scope**):
- eine globale Variable wird erzeugt durch
  1. Definition einer Property auf dem globalen Objekt (`window.variable = 17`)
  2. Initialisierung einer vorher nicht deklarierten Variable (`variable = 4`)
  3. Deklaration einer Variablen im globalen Kontext (`var variable = 21`) - also nicht innerhalb
     einer Funktion.
  4. Deklaration einer Funktion im globalen Kontext (`function fnName() {}`)
- eine lokale Variable, deren Sichtbarkeit sich beschränkft auf eine Funktion, wird erzeugt durch
  1. Deklaration einer Variablen innerhalb einer Funktion (`var lokal = 42`)
  2. Deklaration einer inneren Funktion innerhalb einer Funktion (`function fnName() {}`)

## ECMAScript 6

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

## Global Namespace Pollution

Generell gilt, dass globale Variablen ein Anti-Pattern in JavaScript sind:

```js
var notBestPractice = 'Global Var';
definitlyWrongPractice = 'Global Var';

function demo() {
  totallyWrongPractice = 'Global Var';
}

demo();
```

Alle diese globalen Variablen werden dem globalen Objekt (im Browser `window`) als Eigenschaften
zugewiesen. Also muss ich genau wissen, welche globalen Symbole schon existieren, damit ich keine
dieser überschreibe.

| Leider gilt dies auch für alle global deklarierten Funktionen!

```js
var sample = 17;
var name = 17;    // Ok, why do assign a number to a name variable? ;-)

console.log(typeof sample);  // number of course
console.log(typeof name);    // string??

var console = 'Browser';
console.log('Hoppla'); // [!code error]
```

Zu dem weiß ich nicht, ob noch weitere Scripte eingebunden werden, die ebenfalls exzessiv auf
globale Variablen setzen.

## Strict Mode

Mit ECMAScript 5 wurde der **strict mode** eingeführt. Eingeschaltet wird er über eine *Pragma-Direktive* zu Beginn einer Datei oder auch nur zu Beginn eines Funktionsblocks.

```js
'use strict';

var myVar = 21;
myvar = 22; // [!code error]

function demo() {
  'use strict';
}
```

Neben vielen weiteren strikteren Regeln (siehe dazu im [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)) wurden damit das Schlüsselwort `var` bei der
Variablen-Deklaration quasi Pflicht und es wurden einige der typischen Fehler unterbunden.

Heutzutage sieht man den **Strict Mode** bzw. das Pragma relativ selten, weil dieser in modernem
JavaScript sowohl in Klassen als auch in Modulen automatisch eingeschaltet ist.

## IIFE Pattern

Zur Vermeidung von globalen Variablen und Funktionen wurde das **IIFE**-Muster eingesetzt. Hier
wurde jedes Script in eine anonyme Funktion gepackt, die sofort ausgeführt wurde.

::: info
**IIFE** steht für **I**mmediatly **I**nvoked **F**unction **E**xpression.
:::

```js
(function (){

  console.log('Starting point');

  var topic = 'IIFE';           // Not global

  function prettyPrint(msg) {   // Not global
    console.log(`[${new Date().toLocaleTimeString('de')}] ${msg}`);
  }

  prettyPrint(topic);

})();
```

In Kombination mit dem **strict mode** kann so jegliche globale Variable vermieden werden. Der
*Export* von Variablen/Funktionen für andere Scripte kann zum Beispiel über ein dediziertes globales
Objekt geschehen ([JavaScript Namespacing](https://addyosmani.com/blog/essential-js-namespacing/)).

> Weitere Abschnitte, die sich mit dem Thema Scope beschäftigen, sind [Advanced/Hoisting](../advanced/hoisting), [Advanced/Closures](../advanced/closures) und eben [Advanced/Module](../advanced/modules).
