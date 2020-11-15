### Week10
---
HTML代码中可以书写开始__Tag__,结束_Tag___ ,和自封闭___Tag_ .

一对起止__Tag__ ,表示一个__Element__ .

DOM树中存储的是_Element___和其它类型的节点（Node）.

CSS选择器选中的是__Element__ .

CSS选择器选中的__Element__ ,在排版时可能产生多个_Box___ .

排版和渲染的基本单位是_Box___ .
---
## Box Model
---
> border-box, content-box
---
## layout 排版
-	> 正常流
	-	收集盒进行
	-	计算盒在行中的排布
	-	计算行的排布
	-	BFC block-level-foramtting-context
		-   BFC 合并
		-	只有 margin collapse
		-	Block box
			-	Block container 里面有 BFC
				-	能够容纳正常流的盒, 里面就有 BFC
				-	block, inline-block, flex item, grid cell, table cell, table caption
			-	Block level box 外面有 BFC
		-	设立 BFC
			-	float
			-	absolutely positioned
			-	block containers that are not block boxes
			-	...
		-	BFC 合并
			-	block box && overflow: visible
				-	BFC 合并与 float
				-	BFC 合并与 边距折叠
	-	IFC 
		-	inline-level-formatting-context
		-	line-top -> text-top-> baseline 基线-> text-bottom-> line-bottom
		-	line 受盒影响 产生位移
		-	baseline 基线变化
		-   vertical-align 
	-   float, clear
    	-   影响多行盒的尺寸
    	-   float 堆叠现象
-	> flex
	-	收集盒进行
	-	计算盒在主轴方向的排布
	-	计算盒在交叉轴方向的排布
-	> grid
-	> css houdini
---
## Animation
---
-	> transition
-	> animation
	-	在 animation 中使用 transition
-	贝塞尔曲线	cubic-bezier
	-	三次
---
## render and color
---
-	纯色, 可见光
-	RGB 
-	CMYK(黑色便宜)
-	hsl hsv
---
## 绘制 paint
---
-	几何图形
-	文字
-	位图
-	shader库
-	如何使用复杂的图形 ?
	-	inlinesvg data uri + svg
