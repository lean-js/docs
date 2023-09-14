# Closures

## Begriff

- [Larry Wall in 'Programming Perl'](https://www.cs.ait.ac.th/~on/O/oreilly/perl/prog/ch04_03.htm#:~:text=Closure%20is%20a%20notion%20out,called%20outside%20of%20the%20context.&text=You%20can%20also%20think%20of,subroutine%20template%20without%20using%20eval.): Closure is a notion out of the Lisp world that says if you define an anonymous function in a particular lexical context, it pretends to run in that context even when it's called outside the context.
- [Perl FAQ](http://perldoc.perl.org/perlfaq7.html#What%27s-a-closure?): Closure ist ein Begriff aus der Programmierung, der präzise definiert aber schwer zu beschreiben ist. :-)
- [Wikipedia](<https://de.wikipedia.org/wiki/Closure_(Funktion)>): Eine Closure (oder Funktionsabschluss) ist ein Konzept aus der funktionalen Programmierung. Es beschreibt eine anonyme Funktion, die Zugriffe auf ihren Erstellungskontext enthält.

## Erzeugung

Eine Closure wird erzeugt, wenn in JavaScript eine innere Funktion erstellt wird (Funktion in einer Funktion) und diese

1. eine (oder mehrere) lokale Variable(n) der äußeren Funktion nutzt und
2. aus ihrem Erstellungskontext (äußere Funktion) weitergegeben wird über eine Rückgabe (return)
   oder als Argument an eine andere Funktion.

```js:line-numbers

function createCounter() {
  let count = 0;        // local var, scope limited to this function and inner functions

  function inc() {      // Creates an inner local function
    return ++count;     // access to variable in outer scope
  }

  // if function ends here:
  // both local symbols are trashed!

  // but(!) the function returns the inner function
  return inc;
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3
console.log(counter2()); // 1
console.log(counter1()); // 4
console.log(counter2()); // 2
```

In Zeile 15 (und auch 16) wird die äußere Funktion aufgerufen. Diese legt sich auf dem lokalen Stack
die lokale Variable `count` an. Normalerweise ist der Stack nach dem Ende der Funktion (Zeile 27)
beräumt und es gibt keine Variable `count` und keine Function `inc` mehr. Da aber in Zeile 26 diese
innere Funktion zurückgegeben wird, die eben auch jene Variable nutzt, wird vom JavaScript-Interpreter
ein **closure-scope** erzeugt, in dem diese Variable abgelegt wird.

Mit dem zweiten Aufruf in Zeile 12 passiert das gleiche nochmal.

Am Ende existieren zwei Funktionen mit jeweils einer eigenen `count`-Variable in diesem besonderen Scope.

# Real-World Beispiel

Das folgende Code-Schnipsel soll nur aufzeigen, dass *relativ schnell* (und oft unbewusst) Closures
in JavaScript erzeugt werden:

```js
document.body.insertAdjacentHTML('afterbegin', '<button id="btn1">Click mich!</button>');

document.getElementById('btn1').addEventListener('click', function (ev) {
  const btn = ev.target;
  btn.textContent = 'Danke';
  btn.disabled = true;
  setTimeout(function (){
    btn.textContent = 'Click mich!';
    btn.disabled = false;
  }, 3000);
});
```
