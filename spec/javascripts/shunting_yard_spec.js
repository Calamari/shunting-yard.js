describe("jaz.shuntingYard", function() {
  var testCase = function(key, val) {
    it('"' + key + '" => ' + val.join(' '), function() {
      expect(jaz.shuntingYard(key)).toEqual(val);
    });
  };

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
      '-2 * 4': ['-2', '4', '*']
    };
    for (var key in positiveTest) {
      testCase(key, positiveTest[key]);
    }
  });
});
