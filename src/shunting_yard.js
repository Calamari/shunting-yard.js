/*!
 * Implementation of the Shunting yard algorithm
 * look it up: http://en.wikipedia.org/wiki/Shunting-yard_algorithm
 *
 * Copyright 2013, Georg Tavonius
 * Licensed under the MIT license.
 *
 * @version 1.0.1
 *
 * @author Georg Tavonius a.k.a. Calamari (http://github.com/Calamari)
 * @homepage http://github.com/Calamari/shunting-yard.js
 */
(function(undef) {
  'use strict';
  var jaz = window.jaz || {};

  function Operator(name, precedence, associativity, numParams, method) {
    associativity = associativity || 'left';
    return {
      name: name,
      precedence: precedence,
      params: numParams,
      method: method,
      greaterThen: function(op) {
        return precedence > op.precedence;
      },
      greaterThenEqual: function(op) {
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

  function Function(name, numParams, method) {
    return {
      name: name,
      params: numParams,
      method: method
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
      return jaz.Operators[token];
    }

    function isFunction(token) {
      return jaz.Functions[token];
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
      } else if (isFunction(token)) {
        stack.push(token);
      } else if (isRightPara(token)) {
        while ((operator = stack.pop()) && !isLeftPara(operator)) {
          if (!isFunction(operator)) {
            output.push(operator);
          }
        }
        if (operator === undef) {
          return null; // to many closing paranthesis
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
      token = stack.pop();
      if (isLeftPara(token)) {
        return null; // to many opening paranthesis
      }
      output.push(token);
    }

    return output;
  };

  jaz.Operator = Operator;
  jaz.Operators = {
    '+': new Operator('+', 2, 'left', 2, function(a, b) { return a + b; }),
    '-': new Operator('-', 2, 'left', 2, function(a, b) { return a - b; }),
    '*': new Operator('*', 3, 'left', 2, function(a, b) { return a * b; }),
    '/': new Operator('/', 3, 'left', 2, function(a, b) { return a / b; }),
    '^': new Operator('^', 4, 'right', 2, function(a, b) { return Math.pow(a, b); })
  };

  jaz.Function = Function;
  jaz.Functions = {};

  window.jaz = jaz;
}());
