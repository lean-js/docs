# Literal Objects

In JavaScript können Objekte einfach literal erzeugt werden:

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
```

Der große Pluspunkt von JavaScript ist, dass wir Objekte direkt anlegen können ohne
vorher eine Abstraktion zu machen (mit einer Klasse).

Obige Methoden-Schreibweise/-Syntax wurde mit ECMAScript 6 (JavaScript 2015) eingeführt. In purem ECNAScript 5 hätte der Code wie folgt ausgesehen:

```js
const konto1 = {
  nr: 1001,
  stand: 0,
  einzahlen(betrag) {             // [!code --]
  einzahlen: function (betrag) {  // [!code ++]
    this.stand += betrag;
  },
  auszahlen(betrag) {             // [!code --]
  auszahlen: function (betrag) {  // [!code ++]
    if (betrag > this.stand) {
      return false;
    }
    this.stand -= betrag;
    return true;
  },
};
```
