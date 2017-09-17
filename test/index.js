// const requireAll = (requireContext) => { requireContext.keys().map(requireContext); };

// // requireAll(require.context('spec/helpers/', true, /\.js$/));
// requireAll(require.context('./', true, /[sS]pec\.js$/));
// var testsContext = require.context(".", true, /_test$/);
// testsContext.keys().forEach(testsContext);

require('./ShuntingYard_test');
