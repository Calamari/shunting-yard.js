export default function Operator(name, precedence, associativity, numParams, method) {
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
