/**
 * Resolves a RPN
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

  jaz.resolveRPN = function(array) {
    var stack = [],
        operators = [],
        i, l, op;

    function getOperator(token) {
      return jaz.Operators[token];
    }

    for (i=0,l=array.length; i<l; ++i) {
      op = getOperator(array[i]);
      if (op) {
        stack.push(op.method.apply(this, stack.splice(-op.params)));
      } else {
        stack.push(parseFloat(array[i]));
      }
    }

    return stack[0];
  };

  window.jaz = jaz;
}());
