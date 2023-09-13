# Standard API: Arrays

> Ausführliche Darstellung im [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

## Erzeugung

### Literal

```js
const leer =[];
const zahlen = [1,1,2,3,5,8,13,21];
const dialekte = ['Coffee Script', 'TypeScript'];
```

### Konstruktor

```js
const leer = new Array();
console.log(leer.length);       // 0
const unbelegt = new Array(10);
console.log(unbelegt.length);   // 10
const vorbelegt = new Array(10,20,30);
console.log(vorbelegt.length);  // 3
```

### Konvertierung

```js
const zahlen = Array.from('zeichen');   // Länge: 7
const quadratzahlen = Array.from([1,2,3], (x) => x ** 2);
```
## Properties

Tatsächlich gibt es in Array-Objekten nur eine klassische Eigenschaft, die genutzt wird:
`length` gibt die Länge des Arrays an.

::: warning
Achtung: die Länge des Arrays wird berechnet aus dem höchsten vergebenen ganzzahligen Index plus eins!
Auch die folgenden Array-Methoden operieren nur auf den Index-Properties (also Ganzzahl-Properties) - ein
Array ist aber ein JavaScript-Objekt und könnte beliebige weitere Eigenschaften besetzt haben.
:::


