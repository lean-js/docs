# Modulares JavaScript

## Geschichte

ECMAScript 2015 führte eine Spezifikation für JavaScript-Module ein. Diese wurde allerdings
erst ab 2018 flächendeckend bei den Browser-Herstellern implementiert.

Bis dahin gab es verschiedene Ansätze ein solches Feature mit den Bordmitteln von JavaScript
nachzubauen. Im Wesentlichen setzten alle diese Ansätze auf eine IIFE-Funktion, die
den Modul-Code ummantelt und einen deizierten Export- und Import-Mechanismus.

Dabei kamen verschiedene Tools zum Einsatz, die dem Entwickler die Arbeit abnahmen, diese
Modularität und vor allem auch die Auflösung der Abhängigkeiten umzusetzen.

Die drei wichtigsten Ansätze waren

- JavaScript Namespacing
- AMD (Asynchronous Module Definition)
- CommonJS

Bis auf letzteres, dass in der NodeJS-Welt bis heute (noch) existiert, spielen diese in
heutigem Projekten nur noch eine geringe Rolle.

In dieser Zeit bis 2018 und natürlich auch noch heute spielen die sogenannten **Bundler**
eine wichtige Rolle. Denn obwohl es heutige Browser natürlich gestatten, native
ECMAScript-Module zu benutzen, werden diese in der Regel durch einen Bundler wieder
geschickt zusammengesetzt und in einer minifizierten Datei auf den Server gelegt - und
dann an den Browser ausgeliefert.

Es stellte und stellt sich also wie folgt der Development-Zyklus dar:

Modularer Source-Code in vielen Dateien ---> Bundler ---> Minifizierte einzelne Datei

Die verschiedenen Bundler verstanden dabei jeweils unterschiedliche Modul-Ansätze.

Die wichtigsten Bundler waren und sind

- [Webpack](https://webpack.js.org/) - Der "Urvater" - *heavy config*
- [Parcel](https://parceljs.org/) (AIO-Tool) - *zero config*
- [Rollup](https://rollupjs.org/) - Reines Bundling (alles andere per Plugin) von ES Modules
- [ESBuild](https://esbuild.github.io/) - Viele eingebaute Features
- [Vite](https://vitejs.dev/) (Development Server und Build-Orchestrierer)

Eine Sonderrolle spielen Transpiler wie Babel oder TypeScript, die auf Dateiebene die
ES 6+ Features und damit auch ES Module *herauskompilieren*.

## ECMAScript - Module

**Definition**: Ein JavaScript-Modul ist eine Datei, die entweder oder
  1. vom Browser geladen wird als Modul
  2. oder andere Module importiert und/oder
  3. etwas für andere Module exportiert

Dabei ist der Mechanismus ein All-In Meschanismus. Wenn wir mit Modulen arbeiten muss alles
ein Modul sein. (Es gibt Bundler, die auch gestatten, dass in Dateien nichts exportiert wird, sondern
nur als Nebeneffekt quasi Code läuft bzw. globale Symbole erzeugt werden)

### Laden eines Modules durch den Browser

::: code-group

```js [main.js]
console.log('Modul-Start');
const startZeit = new Date();
var browser = navigator.userAgent;
console.log({startZeit, browser});
```

```html [index.html]
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modulares JavaScript</title>
  </head>
  <body>
    <script type="module" src="main.js"></script> // [!code focus]
  </body>
</html>
```

:::

Der JavaScript-Code unterscheidet sich von bisherigem Code in keiner Weise. Da die Datei aber
als Modul geladen wird, werden keine globalen Variablen definiert. Wer dennoch eine globale
Variable/Funktion einführen will, muss das über das globale Objekt `window` machen.

### Exporting Modules

Das [MDN](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) listet
schön alle Möglichkeiten etwas zu exportieren auf:

```js
// Exporting declarations
export let name1, name2/*, … */; // also var
export const name1 = 1, name2 = 2/*, … */; // also var, let
export function functionName() { /* … */ }
export class ClassName { /* … */ }
export function* generatorFunctionName() { /* … */ }
export const { name1, name2: bar } = o;
export const [ name1, name2 ] = array;

// Export list
export { name1, /* …, */ nameN };
export { variable1 as name1, variable2 as name2, /* …, */ nameN };
export { variable1 as "string name" };
export { name1 as default /*, … */ };

// Default exports
export default expression;
export default function functionName() { /* … */ }
export default class ClassName { /* … */ }
export default function* generatorFunctionName() { /* … */ }
export default function () { /* … */ }
export default class { /* … */ }
export default function* () { /* … */ }

// Aggregating modules
export * from "module-name";
export * as name1 from "module-name";
export { name1, /* …, */ nameN } from "module-name";
export { import1 as name1, import2 as name2, /* …, */ nameN } from "module-name";
export { default, /* …, */ } from "module-name";
export { default as name1 } from "module-name";
```

::: warning
Es ist nur ein Default-Export aus einem Modul erlaubt bzw. möglich.
:::

::: info
In der Regel exportiert ein Modul nur einen Default-Export oder nur benannte Exports. Aber auch
die Mischform ist anzutreffen.

Ein Default-Export wird von den meißten Frameworks benutzt beim Erstellen von Komponenten.
Nach dem Single-Responsibility-Prinzip ist eine Datei für eine Komponente zuständig und exportiert
diese über einen Default-Export. Der Import kann dann über einen frei gewählten Namen erfolgen.

Bibliotheken hingegen exportieren oft nur benannte Exports, so dass der Klient sich die
gewünschten Teile herauspicken kann.
:::

### Importing

Hier sind die Varianten etwas klarer (Link ins [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import))

```js
import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { default as alias } from "module-name";
import { export1, export2 } from "module-name";
import { export1, export2 as alias2, /* … */ } from "module-name";
import { "string name" as alias } from "module-name";
import defaultExport, { export1, /* … */ } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
```
