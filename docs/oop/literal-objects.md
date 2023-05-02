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

Korrekterweise sollte ich natürlich anmerken, dass obige Methoden-Schreibweise/-Syntax
schon ECMAScript 2015 ist. In purem ES 5 hätte der Code wie folgt ausgesehen:

```js{4,7}
const konto1 = {
  nr: 1001,
  stand: 0,
  einzahlen: function (betrag) {
    this.stand += betrag;
  },
  auszahlen: function (betrag) {
    if (betrag > this.stand) {
      return false;
    }
    this.stand -= betrag;
    return true;
  },
};
```
