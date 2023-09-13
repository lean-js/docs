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
