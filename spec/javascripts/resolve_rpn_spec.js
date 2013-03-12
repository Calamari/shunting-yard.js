describe("jaz.resolveRPN", function() {
  var testCase = function(key, val) {
    it('"' + key + '" => ' + val, function() {
      expect(jaz.resolveRPN(key.split(' '))).toEqual(val);
    });
  };

  describe("resolves", function() {
    var positiveTest = {
      '10 3 +': eval('10+3'),
      '10 3 -': eval('10 - 3'),
      '10.5 3.25 -': eval('10.5-3.25'),
      '42 0.1 *': eval('42*0.1'),
      '42 0.1 /': eval('42/0.1'),
      '-42': eval('-42'),
      '+23': eval('+23'),
      '12 2 ^': 144,
      '-2 4 *': eval('-2 * 4'),
      '10 3 3 * +': eval('10+3*3'),
      '-10 3 +': eval('(-10+3)'),
      '3 4 2 * 1 5 - 2 3 ^ ^ / +': 3.0001220703125,
      '-1 -4 2 + *': eval('-1 * (-4 + 2)')
    };
    for (var key in positiveTest) {
      testCase(key, positiveTest[key]);
    }
  });

  describe("when having functions", function() {
    beforeEach(function() {
      jaz.Functions['sqrt'] = new jaz.Function('sqrt', 1, function(a) { console.log(a);return Math.sqrt(a); });
    });
    afterEach(function() {
      delete jaz.Functions['sqrt'];
    });

    it('works', function() {
      expect(jaz.resolveRPN(['6', '6', '3', '+', 'sqrt', '+'])).toEqual(9);
    });
  });
});
