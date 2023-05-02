# ECMAScript 2015+

## class und extends

ECMAScript 2015 führte Schlüsselwörter ein, um die Prototype-Semantik zu *verstecken* und
best-practices zu forcieren:

```js
class Konto {
  constructor(nr) {
    this.nr = nr;
    this.stand = 0;
  }
  einzahlen(betrag) {
    this.stand += betrag;
  }
  auszahlen(betrag) {
    if (betrag > this.stand) {
      return false;
    }
    this.stand -= betrag;
    return true;
  }
}

class GiroKonto extends Konto {
  constructor(nr) {
    super(nr);
    this.dispo = 1000;
  }
  einzahlen(betrag) {
    super.einzahlen(betrag);
  }
  auszahlen(betrag) {
    if (betrag > this.stand + this.dispo) {
      return false;
    }
    this.stand -= betrag;
    return true;
  }
}
```

## ECMAScript 2022

Diverse weitere Neuerungen im Standard lassen auch heute folgendes zu:

```js
class Konto {
  #stand = 0;  // private properties
  zins = 0.0015;
  constructor(nr) {
    this.nr = nr;
  }
  get stand() { return this.#stand; }
  einzahlen(betrag) {
    this.#stand += betrag;
  }
  auszahlen(betrag) {
    if (betrag > this.#stand) {
      return false;
    }
    this.#stand -= betrag;
    return true;
  }
}
```
