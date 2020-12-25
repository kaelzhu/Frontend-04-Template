import assert from 'assert'

import parseHtml from '../src/parser.js'

describe('parse html test', () => {
	it('<a></a>', () => {
		let tree = parseHtml('<a></a>')
		assert.strictEqual(tree.children[0].tagName, 'a')
		assert.strictEqual(tree.children[0].children.length, 0)
	})
	it('<a>abc</a>', () => {
		let tree = parseHtml('<a>abc</a>')
		assert.strictEqual(tree.children[0].tagName, 'a')
		assert.strictEqual(tree.children[0].children.length, 1)
	})
	it('<a href="//www.baidu.com"></a>', () => {
		let tree = parseHtml('<a href="//www.baidu.com"></a>')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].children.length, 0)
	})
	it('<a href ></a>', () => {
		let tree = parseHtml('<a href ></a>')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].children.length, 0)
	})
	it('<a href class></a>', () => {
		let tree = parseHtml('<a href class></a>')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].children.length, 0)
	})
	it('<a href="abc" id></a>', () => {
		let tree = parseHtml('<a href="abc" id></a>')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].children.length, 0)
	})

	it('<a href=abc></a>', () => {
		let tree = parseHtml('<a href=abc></a>')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].children.length, 0)
	})
	it('<a href=abc/>', () => {
		let tree = parseHtml('<a href=abc/>')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].children.length, 0)
	})
	it('<a href=abc />', () => {
		let tree = parseHtml('<a href=abc />')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].children.length, 0)
	})
	it('<a href=\'abc\' />', () => {
		let tree = parseHtml('<a href=\'abc\' />')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].children.length, 0)
	})
	it('<a />', () => {
		let tree = parseHtml('<a />')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].children.length, 0)
	})
	it('<A /> uppercase', () => {
		let tree = parseHtml('<A />')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].children.length, 0)
	})
	it('<>', () => {
		let tree = parseHtml('<>')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].type, 'text')
	})
	it('<html><style>.text { color: red; } #first { color: blue; } .container.text { color: green; }</style><body><div><p class="text">abc</p></div></body></html>', () => {
		let tree = parseHtml('<html><style>.text { color: red; }  #first { color: blue; } .container.text { color: green; }</style><body><div class="container"><p class="text" id="first">abc</p></div></body></html>')
		assert.strictEqual(tree.children.length, 1)
		assert.strictEqual(tree.children[0].children.length, 2)
	})
})
