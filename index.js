const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const kssConstants = require('./src/kssConstants.js')

/*
returns a two dimensional array like
'group.selected > node' is [ ['group', 'selected'], ['>'], ['node'] ]
*/
function tokenizeSelector(selector){
	return selector.split(' ').map(token => token.split('.'))
}

/*
Accepts class, id, or spatial element names like 'scene' or 'node'
*/
function isSpatialSelector(selector){
	if(selector.startsWith('.') || selector.startsWith('#') || selector.startsWith(':')){
		return true
	}
	return tokenizeSelector(selector).some(tokens => {
		return kssConstants.spatialSelectors.includes(tokens[0].split('[')[0])
	})
}

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

module.exports = postcss.plugin('postcss-potassium', function (opts) {
	opts = opts || {}
	return function (root, result) {
		const spatialStyles = {
			generated: new Date(),
			rules: []
		}
		root.walkRules(rule => {
			const ruleData = {
				declarations: [],
				selectors: rule.selectors.filter(selector => isSpatialSelector(selector))
			}
			if(ruleData.selectors.length === 0) return
			spatialStyles.rules.push(ruleData)
			rule.walkDecls(decl => {
				ruleData.declarations.push({
					property: decl.prop,
					value: decl.value
				})
				if(decl.important === true){
					ruleData.declarations[ruleData.declarations.length - 1].important = true
				}
			})
		})

		const jsonFileName = `${result.opts.to.substring(0, result.opts.to.length - 4)}.json`
		ensureDirectoryExistence(jsonFileName)
		fs.writeFileSync(jsonFileName, JSON.stringify(spatialStyles, null, 4))
	}
})
