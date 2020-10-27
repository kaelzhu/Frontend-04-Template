## Html parser

---

### html => FSM(whatwg.org) => DOM
---
-	start tag
-	end tag
-	self-close tag
-	空白符
	-	\t\n\f 和 空格
-	FSM
	-	加入业务逻辑
-	词法分析
	-	emit
	-	currentToken
		-	type, tagName
	-	currentAttriute
		-	name, value
		-	name
		-	doubleQuoted
		-	singleQuoted
		-	unquoted
	-	currentTextNode
-	语法分析
	-	栈
	-	栈顶
-	CSS Computing
	-	css parser
		-	npm intsall css
	-	应用CSS规则的时机
		-	在 startTag 时就能判断
	-	选择器与元素的匹配
		-	双循环
		-	复合选择器
		-	简单选择器
	-	selector specification
		-   四元组