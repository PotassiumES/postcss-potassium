const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const kssConstants = require('./src/kssConstants.js')

/*
returns a two dimensional array like
'group.selected > node' is [ ['group', 'selected'], ['>'], ['node'] ]
*/
function tokenizeSelector(selector){
	return selector.trim().split(' ').map(token => 
		token.split('.').filter(token => (token.trim().length > 0 && token !== '>' && token !== '>>'))
	)
}

const domType = Symbol('dom')
const somType = Symbol('som')
const unknownType = Symbol('unknown')

function selectorType(selector){
	if(isDOMSelector(selector)) return domType
	if(isSOMSelector(selector)) return somType
	return unknownType
}

function isSOMSelector(selector){
	return tokenizeSelector(selector).some(tokens => {
		if(tokens.length === 0) return false
		return kssConstants.somSelectors.includes(tokens[0].split('[')[0])
	})
}

function isDOMSelector(selector){
	return tokenizeSelector(selector).some(tokens => {
		if(tokens.length === 0) return false
		return kssConstants.domSelectors.includes(tokens[0].split('[')[0])
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
		const nonDOMRules = [] // Rules to remove from CSS
		root.walkRules(rule => {
			// Sort the selectors into dom, som, or both
			const domSelectors = []
			const somSelectors = []
			for(const selector of rule.selectors){
				switch(selectorType(selector)){
					case domType:
						domSelectors.push(selector)
						break
					case somType:
						somSelectors.push(selector)
						break
					default:
						// Could not determine type, so include in both
						domSelectors.push(selector)
						somSelectors.push(selector)
				}
			}
			if(domSelectors.length === 0){
				// mark for removal from CSS
				nonDOMRules.push(rule)
			}
			if(somSelectors.length === 0){
				// there are no SOM selectors, so no need to continue
				return
			}
			const ruleData = {
				declarations: [],
				selectors: somSelectors
			}
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

		for(const ruleToRemove of nonDOMRules){
			ruleToRemove.remove()
		}
	}
})
