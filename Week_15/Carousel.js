import { Component, STATE, ATTRIBUTES } from './framework'
import { enableGesture } from './gesture.js'
import { TimeLine, Animation } from './animation.js'
import { linear } from './ease.js'

export { STATE, ATTRIBUTES } from './framework.js'

export class Carousel extends Component {
	constructor() {
		super()
	}

	render() {
		this.root = document.createElement('div')
		this.root.classList.add('carousel')
		for (const record of this[ATTRIBUTES].src) {
			const child = document.createElement('div')
			child.style.backgroundImage = `url(${record})`
			this.root.appendChild(child)
		}
		const children = this.root.children

		enableGesture(this.root)
		const timeline = new TimeLine()
		timeline.start()

		let handler = null

		this[STATE].position = 0
		let t = 0
		let ax = 0

		this.root.addEventListener('start', (event) => {
			timeline.pause()
			clearInterval(handler)
			if (Date.now() - t < 500) {
				let progress = (Date.now() - t) / 500
				ax = linear(progress) * 500 - 500
			} else {
				ax = 0
			}
		})

		this.root.addEventListener('tap', () => {
			this.triggerEvent('click', {
				position: this[STATE].position,
				data: this[ATTRIBUTES].src[this[STATE].position],
			})

		})

		this.root.addEventListener('pan', (event) => {
			console.log('pan')
			let x = event.clientX - event.startX - ax
			let current = this[STATE].position - (x - x % 500) / 500

			for (const offset of [-1, 0, 1]) {
				let pos = current + offset

				pos = (pos % children.length + children.length) % children.length

				children[pos].style.transition = 'none'
				children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`
			}
		})

		this.root.addEventListener('end', (event) => {

			timeline.reset()
			timeline.start()
			handler = setInterval(nextPicture, 3000)


			let x = event.clientX - event.startX - ax
			let current = this[STATE].position - (x - x % 500) / 500

			let direction = Math.round((x % 500) / 500)

			if (event.isFlick) {
				if (event.velocity > 0) {
					direction = Math.floor((x % 500) / 500)
				} else {
					direction = Math.ceil((x % 500) / 500)
				}
			}

			for (const offset of [-1, 0, 1]) {
				let pos = current + offset

				pos = (pos % children.length + children.length) % children.length

				children[pos].style.transition = ''

				timeline.add(new Animation(children[pos].style, 'transform',
					- pos * 500 + offset * 500 + x % 500,
					- pos * 500 + offset * 500 + direction * 500,
					500, 0, linear, v => `translateX(${v}px)`))

				this[STATE].position = this[STATE].position - (x - x % 500) / 500 + direction
				this[STATE].position = (this[STATE].position % children.length + children.length) % children.length

				this.triggerEvent('change', { position: this[STATE].position })

			}
		})

		let nextPicture = () => {
			const length = children.length
			t = Date.now()

			let nextIndex = (this[STATE].position + 1) % length

			let current = children[this[STATE].position]
			let next = children[nextIndex]
			// left middle right
			timeline.add(new Animation(current.style, 'transform',
				- this[STATE].position * 500,
				- 500 - this[STATE].position * 500,
				500, 0, linear, v => `translateX(${v}px)`))
			timeline.add(new Animation(next.style, 'transform',
				500 - nextIndex * 500,
				- nextIndex * 500,
				500, 0, linear, v => `translateX(${v}px)`))

			this[STATE].position = nextIndex

			this.triggerEvent('change', { position: this[STATE].position })
		}

		handler = setInterval(nextPicture, 3000)

		return this.root
	}
}
