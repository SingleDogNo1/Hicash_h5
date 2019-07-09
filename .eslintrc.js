// module.exports = {
//     root: true,
//     parser: 'babel-eslint',//解析器，这里我们使用babel-eslint
//     parserOptions: {
//       sourceType: 'module',//类型为module，因为代码使用了使用了ECMAScript模块
// 		parser: 'babel-eslint'
//     },
//     extends: [
//         // "plugin:prettier/recommended"
//     ],
//     env: {
//       browser: true,//预定义的全局变量，这里是浏览器环境
//     },
//     // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
//     //extends: 'standard', //扩展，可以通过字符串或者一个数组来扩展规则
//     // required to lint *.vue files
//     plugins: [
//      // 'html', //插件，此插件用于识别文件中的js代码，没有MIME类型标识没有script标签也可以识别到，因此拿来识别.vue文件中的js代码
//      'vue',
//     // 'prettier'
//     ],
//     // add your custom rules here
//     'rules': {
//     }
//   }


// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true,
	},
	extends: [
		// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
		// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
		'plugin:vue/essential',
		// https://github.com/standard/standard/blob/master/docs/RULES-en.md
		'standard',
		// 'plugin:prettier/recommended'
	],
	// required to lint *.vue files
	plugins: [
		'vue',
		// 'prettier'
	],
	// add your custom rules here
	rules: {
		"no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
		"semi": 0,
		"indent": 0,
		"quotes": 0,
		"standard/computed-property-even-spacing": 0,
		"no-new": 0,
		"no-irregular-whitespace": 0,
		// -------------- 汇有财line --------------
		"eqeqeq": 0,
		"no-tabs": 0,
		"parentheses": 0,
		"space-before-function-paren": 0,
		"space-before-blocks": 0,
		"keyword-spacing": 0,
		"spaced-comment": 0,
		"vue/no-unused-components": 0,
		"unicode-bom": 0,
		"no-unused-vars": 0,
		"comma-spacing": 0,
		"no-mixed-spaces-and-tabs": 0,
		"no-multi-spaces": 0,
		"object-curly-spacing": 0,
		"no-dupe-keys": 0,
		"no-trailing-spaces": 0,
		"no-undef": 0,
		"space-in-parens": 0,
		"arrow-spacing": 0,
		"eol-last": 0,
		"one-var": 0,
		"handle-callback-err": 0,
		"key-spacing": 0,
		"no-multiple-empty-lines": 0,
		"block-spacing": 0,
		"space-infix-ops": 0,
		"semi-spacing": 0,
		"comma-dangle": 0,
		"padded-blocks": 0,
		"standard/object-curly-even-spacing": 0,
		"vue/require-v-for-key": 0,
		"camelcase": 0,
		"no-unused-expressions": 0,
		"wrap-iife": 0,
		"no-use-before-define": 0,
		"vue/no-use-v-if-with-v-for": 0,
		"no-redeclare": 0,
		"no-unreachable": 0,
		"no-useless-escape": 0,
		"vue/no-dupe-keys": 0,
		"vue/no-parsing-error": 0,
		"no-compare-neg-zero": 0,
		"no-control-regex": 0,
		"no-inner-declarations": 0,
		"no-sequences": 0
	}
}
