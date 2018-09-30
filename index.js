var postcss = require('postcss')

module.exports = postcss.plugin('postcss-potassium', function (opts) {
	opts = opts || {};
	return function (root, result) {
		console.log('Potassium Processing...', root, result)
		// Transform CSS AST here
	}
})
