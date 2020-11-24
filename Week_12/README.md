## 组件化
---
-	对象
-	组件
	-	property
		-	从属关系
		-	对象
		-	(resolved)处理过的 attribute
		-	input.value
	-	method
	-	inherit
	---
	-	attribute
		-	描述
	-	config & state
	-	event
	-	lifecycle
	-	children
	---
	### Scenes to change
	
 | Markdown set | JS set | JS Change | User Input Change |           |
 | ------------ | ------ | --------- | ----------------- | --------- |
 | ×            | √      | √         | ?                 | property  |
 | √            | √      | √         | ?                 | attribute |
 | ×            | ×      | ×         | √                 | state     |
 | ×            | √      | ×         | ×                 | config    |
---
Q: attribute 与 property 在什么情况下不等效 ?
A: 不带协议的 url, 字符串的value, input.value 
---
### components
---
-	react jsx
	-	webpack webpack-cli
	-	babel-loader @babel/core babel-plugin @babel/preset-env
-	vue markdown language parser
---
### Carousel Component
---
	-	webpack
	-	webpack-dev-server
	-	babel