/**
 * Implementation of the Shunting yard algorithm
 * look it up: http://en.wikipedia.org/wiki/Shunting-yard_algorithm
 * @author Georg Tavonius a.k.a. Calamari (http://github.com/Calamari)
 * @homepage http://github.com/Calamari/shunting-yard.js
 */
 /**
   TODO:
     - change tokenizer from '' to whitespace for example
     - change operators
  */
(function() {
  'use strict';
  var jaz = window.jaz || {};

  jaz.shuntingYard = function(string) {
    var operators = ['+', '-', '*', '/', '^'],
        output = [],
        stack = [],
        lastToken,
        i, l, token;

    function isOperator(token) {
      return operators.indexOf(token) !== -1;
    }

    function popStackToOutput() {
    }

    for (i=0,l=string.length; i<l; ++i) {
      token = string[i];
      if (token === ' ') {
        continue; // do nothing with spaces
      }
      if (i === 0) {
        output.push(token);
      } else if (isOperator(token)) {
        stack.push(token);
      } else {
        if (!lastToken || isOperator(lastToken) && i!==1) {
          output.push(token);
        } else {
          output[output.length-1] += token;
        }
      }
      lastToken = token;
    }

    // append the rest of the stack to the output
    for (i=0,l=stack.length;i<l;++i) {
      output.push(stack[i]);
    }

    return output;
  };

  window.jaz = jaz;
}());
