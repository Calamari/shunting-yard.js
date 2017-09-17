import { expect} from 'chai';

import ShuntingYard, { Operator, Function } from '../src/index';

describe("ShuntingYard", function() {
  var shuntingYard;

  beforeEach(function() {
    shuntingYard = new ShuntingYard();
  });

  const testCase = function(key, val) {
    it('"' + key + '" => ' + val.join(' '), function() {
      expect(shuntingYard.parse(key)).to.eql(val);
    });
  };

  const testResolveCase = function(key, val){
    it('"' + key + '" => ' + val, function() {
      console.log(shuntingYard.parse(key))
      expect(shuntingYard.resolve(key)).to.eql(val);
    });
  };

  it('returns an Array', function() {
    expect(shuntingYard.parse('').constructor).to.eql(Array);
  });

  describe("resolves strings", function() {
    var positiveTest = {
      '10+3': ['10', '3', '+'],
      '10 - 3': ['10', '3', '-'],
      '10.5-3.25': ['10.5', '3.25', '-'],
      '42*0.1': ['42', '0.1', '*'],
      '42/0.1': ['42', '0.1', '/'],
      '-42': ['-42'],
      '+23': ['+23'],
      '12^2': ['12', '2', '^'],
      '-2 * 4': ['-2', '4', '*'],
      '(10+3)': ['10', '3', '+'],
      '10+3*3': ['10', '3', '3', '*', '+'],
      '(-10+3)': ['-10', '3', '+'],
      '3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3': ['3', '4', '2', '*', '1', '5', '-', '2', '3', '^', '^', '/', '+'],
      '-1 * (-4 + 2)': ['-1', '-4', '2', '+', '*']
    };
    for (var key in positiveTest) {
      testCase(key, positiveTest[key]);
    }
  });

  describe("resolves this tokenized arrays", function() {
    var positiveTest = {
      '10 + 3': ['10', '3', '+'],
      '10 - 3': ['10', '3', '-'],
      '10.5 - 3.25': ['10.5', '3.25', '-'],
      '42 * 0.1': ['42', '0.1', '*'],
      '42 / 0.1': ['42', '0.1', '/'],
      '-42': ['-42'],
      '+23': ['+23'],
      '12 ^ 2': ['12', '2', '^'],
      '-2 * 4': ['-2', '4', '*'],
      '( 10 + 3 )': ['10', '3', '+'],
      '10 + 3 * 3': ['10', '3', '3', '*', '+'],
      '( -10 + 3 )': ['-10', '3', '+'],
      '3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3': ['3', '4', '2', '*', '1', '5', '-', '2', '3', '^', '^', '/', '+'],
      '-1 * ( -4 + 2 )': ['-1', '-4', '2', '+', '*']
    };
    for (var key in positiveTest) {
      testCase(key.split(' '), positiveTest[key]);
    }
  });

  describe('resolves some calculations', function() {
    var positiveTest = {
      '10 + 3': 13,
      '10 - 3': 7,
      '10.5 - 3.25': 7.25,
      '42 * 0.1': 4.2,
      '-42': -42,
      '+23': 23,
      '12 ^ 2': 144,
      '10 + 3 * 3': 19,
      '(10 + 3) * 3': 39
    };
    for (var key in positiveTest) {
      testResolveCase(key, positiveTest[key]);
    }
  });

  it('returns null if to many paranthesis are closed', function() {
    expect(shuntingYard.parse('1*(3+4))')).to.eql(null);
  });

  it('returns null if to many paranthesis are opened', function() {
    expect(shuntingYard.parse('1*((3+4)')).to.eql(null);
  });

  describe("when having functions", function() {
    beforeEach(function() {
      shuntingYard.addFunction('sqrt', new Function('sqrt', 1, function(a) { return Math.sqrt(a); }))
    });

    it('parses those functions', function() {
      expect(shuntingYard.parse([1, '*', 'sqrt', '(', 3, '+', 6, ')'])).to.eql([1, 3, 6, '+', 'sqrt', '*']);
    });

    it('resolves those functions', function() {
      expect(shuntingYard.resolve([1, '*', 'sqrt', '(', 3, '+', 6, ')'])).to.eql(3);
    });

    it('resolves created RPN', function() {
      expect(shuntingYard.resolveRpn([1, 3, 6, '+', 'sqrt', '*'])).to.eql(3);
    });

    describe("when adding some custom operators", function() {
      beforeEach(function() {
        shuntingYard.addOperator('add', new Operator('add', 2, 'left', 2, function(a, b) { return a + b; }))
        shuntingYard.addOperator('multiply', new Operator('multiply', 2, 'left', 2, function(a, b) { return a * b; }));
      });

      it('it parses those custom operators', function() {
        expect(shuntingYard.parse(['2','multiply','(','3','add','4',')'])).to.eql(['2', '3', '4', 'add', 'multiply']);
      });

      it('it resolves those custom operators', function() {
        expect(shuntingYard.resolve(['2','multiply','(','3','add','4',')'])).to.eql(14);
      });

      it('resolves cerated RPN', function() {
        expect(shuntingYard.resolveRpn(['2', '3', '4', 'add', 'multiply'])).to.eql(14);
      });
    });
  });
});
