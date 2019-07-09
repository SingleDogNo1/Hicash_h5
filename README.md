# hicash_h5_cli

> 第三方组件和插件放到src目录下，记得在文件开头加上`/* eslint-disable */`，可以整个文件跳过eslint检查

## 添加 lint-staged
```
{
	// ......
	"lint-staged": {
		"src/**/*.{js,json,css,scss,md}": [
			"prettier --write",
			"npm run lint",
			"git add"
		]
	},
	"husky": {
		"hooks": {
			"pre-commit": "lint-staged"
		}
	}
}
```
