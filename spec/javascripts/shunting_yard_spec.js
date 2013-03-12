describe("jaz.shuntingYard", function() {
  var testCase = function(key, val) {
    it('"' + key + '" => ' + val.join(' '), function() {
      expect(jaz.shuntingYard(key)).toEqual(val);
    });
  };

  it('returns an Array', function() {
    expect(jaz.shuntingYard('').constructor).toEqual(Array);
  });

  describe("resolves", function() {
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

  it('returns null if to many paranthesis are closed', function() {
    expect(jaz.shuntingYard('1*(3+4))')).toEqual(null);
  });

  it('returns null if to many paranthesis are opened', function() {
    expect(jaz.shuntingYard('1*((3+4)')).toEqual(null);
  });

  describe("when having functions", function() {
    beforeEach(function() {
      jaz.Functions['sqrt'] = new jaz.Function('sqrt', 1, function(a) { return Math.sqrt(a); });
    });
    afterEach(function() {
      delete jaz.Functions['sqrt'];
    });

    it('works', function() {
      expect(jaz.shuntingYard([1, '*', 'sqrt', '(', 3, '+', 4, ')'])).toEqual([1, 3, 4, '+', 'sqrt', '*']);
    });
  });

  describe("when adding some custom operators", function() {
    beforeEach(function() {
      jaz.Operators['add'] = new jaz.Operator('add', 2, 'left', 2, function(a, b) { return a + b; });
      jaz.Operators['multiply'] = new jaz.Operator('multiply', 2, 'left', 2, function(a, b) { return a * b; });
    });
    afterEach(function() {
      delete jaz.Operators['add'];
      delete jaz.Operators['multiply'];
    });

    it('it works', function() {
      expect(jaz.shuntingYard(['2','multiply','(','3','add','4',')'])).toEqual(['2', '3', '4', 'add', 'multiply']);
    });
  });
});
