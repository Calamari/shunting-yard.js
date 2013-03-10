/**
 * Implementation of the Shunting yard algorithm
 * look it up: http://en.wikipedia.org/wiki/Shunting-yard_algorithm
 *
 * Copyright 2013, Georg Tavonius
 * Licensed under the MIT license.
 *
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

  function Operator(name, precedence, associativity) {
    associativity = associativity || 'left';
    return {
      name: name,
      precedence: precedence,
      higherThen: function(op) {
        return precedence > op.precedence;
      },
      higherThenEqual: function(op) {
        return precedence >= op.precedence;
      },
      equalThen: function(op) {
        return precedence === op.precedence;
      },
      lessThen: function(op) {
        return precedence < op.precedence;
      },
      lessThenEqual: function(op) {
        return precedence <= op.precedence;
      },
      leftAssoc: function() {
        return associativity === 'left';
      },
      rightAssoc: function() {
        return associativity === 'right';
      }
    };
  }

  jaz.shuntingYard = function(string) {
    var operators = ['+', '-', '*', '/', '^'],
        output = [],
        stack = [],
        lastToken, sign,
        i, l, token, operator, thisOperator;

    function isLeftPara(token) {
      return token === '(';
    }

    function isRightPara(token) {
      return token === ')';
    }

    function isOperator(token) {
      return operators.indexOf(token) !== -1;
    }

    for (i=0,l=string.length; i<l; ++i) {
      token = string[i];
      if (token === ' ') {
        continue; // do nothing with spaces
      }
      if (sign) {
        token = sign += token;
        sign = null;
      }
      if (isLeftPara(token)) {
        stack.push(token);
      } else if (isRightPara(token)) {
        while ((operator = stack.pop()) && !isLeftPara(operator)) {
          output.push(operator);
        }
      } else if (isOperator(token)) {
        if (!lastToken || lastToken === '(') {
          sign = token;
          continue;
        }
        while (stack.length) {
          thisOperator = jaz.Operators[token];
          operator = jaz.Operators[stack[stack.length-1]];
          if (!operator || !thisOperator) { break; }
          if ((thisOperator.leftAssoc() && thisOperator.lessThenEqual(operator)) || thisOperator.lessThen(operator)) {
            output.push(stack.pop());
          } else {
            break;
          }
          // operator = null;
          // thisOperator = null;
        }
        stack.push(token);
      } else {
        if (!lastToken || isLeftPara(lastToken) || isOperator(lastToken)) {
          output.push(token);
        } else {
          output[output.length-1] += token;
        }
      }
      lastToken = token;
    }

    // append the rest of the stack to the output
    // for (i=0,l=stack.length;i<l;++i) {
    //   output.push(stack[i]);
    // }
    while (stack.length) {
      output.push(stack.pop());
    }

    return output;
  };

  jaz.Operator = Operator;
  jaz.Operators = {
    '+': new Operator('+', 2, 'left'),
    '-': new Operator('-', 2, 'left'),
    '*': new Operator('*', 3, 'left'),
    '/': new Operator('/', 3, 'left'),
    '^': new Operator('^', 4, 'right')
  };

  window.jaz = jaz;
}());
