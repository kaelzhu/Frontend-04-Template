import { Component } from './framework'

export class Carousel extends Component {
	constructor() {
		super()
		this.attributes = Object.create(null)
	}

	setAttribute(name, value) {
		this.attributes[name] = value
	}

	render() {
		this.root = document.createElement('div')
		this.root.classList.add('carousel')
		for (const record of this.attributes.src) {
			const child = document.createElement('div')
			child.style.backgroundImage = `url(${record})`
			this.root.appendChild(child)
		}


		let position = 0
		this.root.addEventListener('mousedown', event => {
			console.log('positon', position)

			let children = this.root.children
			let startX = event.clientX

			let move = event => {
				let x = event.clientX - startX
				let current = position - (x - x % 500) / 500

				for (const offset of [-1, 0, 1]) {
					let pos = current + offset
					while (pos < 0) {
						pos += children.length
					}
					pos %= children.length

					children[pos].style.transition = 'none'
					children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`
				}
			}

			let up = event => {
				let x = event.clientX - startX
				position = position - Math.round(x / 500)

				for (const offset of [0, Math.sign(x % 500 - 250 * Math.sign(x))]) {
					let pos = position + offset
					while (pos < 0) {
						pos += children.length
					}
					pos %= children.length

					children[pos].style.transition = ''
					children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`
				}
				document.removeEventListener('mousemove', move)
				document.removeEventListener('mouseup', up)
			}

			document.addEventListener('mousemove', move)
			document.addEventListener('mouseup', up)
		})
		/*let currentIndex = 0
		setInterval(() => {
			const children = this.root.children
			const length = children.length
	
			let nextIndex = (currentIndex + 1) % length
	
			let current = children[currentIndex]
			let next = children[nextIndex]
			// left middle right
			next.style.transition = 'none'
			next.style.transform = `translateX(${100 - nextIndex * 100}%)`
	
			setTimeout(() => {
				next.style.transition = ''
				current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
				next.style.transform = `translateX(${- nextIndex * 100}%)`
	
				currentIndex = nextIndex
			}, 16)
	
		}, 3000)*/

		return this.root
	}

	mountTo(parent) {
		parent.appendChild(this.render())
	}
}
