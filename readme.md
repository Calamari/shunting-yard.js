# Shunting Yard Algorithm [![Build Status](https://travis-ci.org/Calamari/shunting-yard.js.png)](https://travis-ci.org/Calamari/shunting-yard.js)

The shunting yard algorithm transforms a mathematical expression from infix notation into a reversed polish notation (postfix).

An more in depth introduction to this algorithm you can get on [Wikipedia](http://en.wikipedia.org/wiki/Shunting-yard_algorithm).


## Implementation details

### if used with a string

This implementation of the shunting yard algorithm takes a String in and puts out an array representation in reversed polish notation (RPN). The resulting RPN you can easily processed (using the `ShuntingYard.resolveRpn` function) to a resulting number.

Note that `ShuntingYard.parse` will ignore every whitespace of the input string. Strings formatted like `'1 100 + 5'` will result in the array containing those tokens: `[1100, 5, +]` – which also allows for nice formatting of bigger number, but could lead to problems if there was meant an operator between 1 and 100.

### if used with an input array

Used with an array of tokens, you have some more flexibility, because the operator tokens can be longer then single characters.

In both cases, you have to define which operators will be in your input. That is, because the algorithm has to know the precedence and associativity of the operators. Predefined are those common operators: `+`, `-`, `*`, `/` and `^`.

Beware that your tokens don't contain whitespaces at the beginning or the end, so `"+"` is not the same as `" +"`.


## Example

```js
const shuntingYard = new ShuntingYard();
const rpn = shuntingYard.parse('10+3*3'); // rpn is now: ['10', '3', '3', '*', '+']
const result = shuntingYard.resolveRPN(rpn); // result is now: 19
// or in short:
const result2 = shuntingYard.resolve(rpn); // result is now: 19
```

If you want, you could also use eval for this string but nobody would like to have eval in their code (considering what eval is doing to your parser and the security implications you have to be aware of).

But the real benefit of this way is when defining your own Operators. Just like that:

```js
const shuntingYard = new ShuntingYard();
shuntingYard.addOperator('o', new Operator('o', 2, 'left', 2, function(a, b) { return a + Math.sqrt(b); }));
var rpn = shuntingYard.parse('10o3*3'); // rpn is now: ['10', '3', '3', '*', 'o']
var result = shuntingYard.resolveRPN(rpn); // result is now: 13
```

You can also use an array as input:

```js
shuntingYard.addOperator('add', new Operator('add', 2, 'left', 2, function(a, b) { return a + b; }));
var rpn = shuntingYard.parse([5, 'add', 4, '*', 4]); // rpn is now: [5, 4, 4, '*', 'add']
var result = shuntingYard.resolveRPN(rpn); // result is now: 21
```

And you can define new functions (those do not have to be infix):

```js
shuntingYard.addOperator('sqrt', new Operator('sqrt', 1, function(a) { return Math.sqrt(a); }));
var rpn = shuntingYard.parse([6, '+', 'sqrt', '(', 6, '+', 3 ')']); // rpn is now: ['6', '6', '3', '+', 'sqrt', '+']
var result = shuntingYard.resolveRPN(rpn); // result is now: 9
```

## TODOs

For `resolveRPN`:
  - change tokenizer from '' to whitespace for example
  - change operators


## MIT License

Copyright (C) 2013-2017 Georg Tavonius

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
