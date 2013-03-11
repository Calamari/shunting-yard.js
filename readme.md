# Shunting Yard Algorithm

The shunting yard algorithm transforms a mathematical expression from infix notation into a reversed polish notation (postfix).

An more in depth introduction to this algorithm you can get on [Wikipedia](http://en.wikipedia.org/wiki/Shunting-yard_algorithm).


## Implementation details

### if used with a string

This implementation of the shunting yard algorithm takes a String in and puts out an array representation in reversed polish notation (RPN). The resulting RPN you can easily parse (using the jaz.resolveRPN function) to an resulting number.

Note that `jaz.shuntingYard` will ignore every whitespace of the input string. Strings formatted like `'1 100 + 5'` will result in the array containing those tokens: `[1100, 5, +]` – which also allows for nice formatting of bigger number, but could lead to problems if there was meant an operator between 1 and 100.

### if used with an input array

Used with an array of tokens, you have some more flexibility, because the operator tokens can be longer then single characters.


## Example

```js
var rpn = jaz.shuntingYard('10+3*3'); // rpn is now: ['10', '3', '3', '*', '+']
var result = jaz.resolveRPN(rpn); // result is now: 19
```

If you want, you could also use eval for this string but nobody would like to have eval in their code (considering what eval is doing to your parser and the security implications you have to be aware of).

But the real benefit of this way is when defining your own Operators. Just like that:

```js
jaz.Operators['o'] = new jaz.Operator('o', 2, 'left', 2, function(a, b) { return a + Math.sqrt(b); });
var rpn = jaz.shuntingYard('10o3*3'); // rpn is now: ['10', '3', '3', '*', 'o']
var result = jaz.resolveRPN(rpn); // result is now: 13
```

You can also use an array as input:

```js
jaz.Operators['add'] = new jaz.Operator('add', 2, 'left', 2, function(a, b) { return a + b; });
var rpn = jaz.shuntingYard([5, 'add', 4, '*', 4]); // rpn is now: [5, 4, 4, '*', 'add']
var result = jaz.resolveRPN(rpn); // result is now: 21
```


## MIT License

Copyright (C) 2013 Georg Tavonius

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
