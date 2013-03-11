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
});
