describe("jaz.shuntingYard", function() {
  var testCase = function(key, val) {
    it('"' + key + '" => ' + val, function() {
      expect(jaz.shuntingYard(key)).toBe(val);
    });
  };

  describe("resolves", function() {
    var positiveTest = {
      '10+3': ['10', '3', '+'],
      '10-3': ['10', '3', '-'],
      '10.5-3.25': ['10.5', '3.25', '-'],
      '42*0.1': ['42', '0.1', '*'],
      '42/0.1': ['42', '0.1', '/']
    };
    for (var key in positiveTest) {
      testCase(key, positiveTest[key]);
    }
  });
});
