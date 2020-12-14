// listen recognize dispatch
class Listener {
	constructor(element, recognizer) {
		this.element = element
		this.recognizer = recognizer


		const contexts = new Map()
		// mouse event
		let isListeningMouse = false
		this.element.addEventListener('mousedown', event => {
			let context = Object.create(null)
			contexts.set('mouse' + (1 << event.button), context)

			this.recognizer.start(event, context)

			let mousemove = event => {
				let button = 1
				let context
				while (button <= event.buttons) {
					if (button & event.buttons) {
						let key
						if (button === 4) {
							key = 2
						} else if (button === 2) {
							key = 4
						} else {
							key = button
						}
						context = contexts.get('mouse' + key)
						this.recognizer.move(event, context)
					}
					button <<= 1
				}
			}

			let mouseup = event => {
				let context = contexts.get('mouse' + (1 << event.button))
				this.recognizer.end(event, context)
				contexts.delete('mouse' + (1 << event.button))

				if (event.buttons === 0) {
					document.removeEventListener('mousemove', mousemove)
					document.removeEventListener('mouseup', mouseup)
					isListeningMouse = false
				}
			}

			if (!isListeningMouse) {
				document.addEventListener('mousemove', mousemove)
				document.addEventListener('mouseup', mouseup)
				isListeningMouse = true
			}
		})


		// touch event
		this.element.addEventListener('touchstart', (event) => {
			for (const point of event.changedTouches) {
				const context = Object.create(null)
				contexts.set(touch.identifier, context)
				this.recognizer.start(point, context)
			}
		})
		this.element.addEventListener('touchmove', (event) => {
			for (const point of event.changedTouches) {
				const context = contexts.get(touch.identifier)
				this.recognizer.move(point, context)
			}
		})
		this.element.addEventListener('touchend', (event) => {
			for (const point of event.changedTouches) {
				const context = contexts.get(touch.identifier)
				this.recognizer.end(point, context)
				contexts.delete(touch.identifier)
			}
		})
		this.element.addEventListener('touchcancel', (event) => {
			for (const point of event.changedTouches) {
				const context = contexts.get(touch.identifier)
				this.recognizer.cancel(point, context)
				contexts.delete(touch.identifier)
			}
		})


	}
}

class Recognizer {
	constructor(dispatcher) {
		this.dispatcher = dispatcher
	}
	start(point, context) {
		context.startX = point.clientX, context.startY = point.clientY

		this.dispatcher.dispatch('start', {
			clientX: point.clientX,
			clientY: point.clientY,
		})

		context.points = [{
			t: Date.now(),
			x: point.clientX,
			y: point.clientY,
		}]

		context.isTap = true
		context.isPan = false
		context.isPress = false

		context.handler = setTimeout(() => {
			context.isTap = false
			context.isPan = false
			context.isPress = true
			context.handler = null
			this.dispatcher.dispatch('press', {})
		}, 500)
	}

	move(point, context) {
		let dx = point.clientX - context.startX, dy = point.clientX - context.startY

		if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
			context.isTap = false
			context.isPan = true
			context.isPress = false
			context.isVertical = Math.abs(dx) < Math.abs(dy)
			this.dispatcher.dispatch('panstart', {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
			})
			clearTimeout(context.handler)
		}

		if (context.isPan) {
			this.dispatcher.dispatch('pan', {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
			})
		}

		context.points = context.points.filter(point => Date.now() - point.t < 500)

		context.points.push({
			t: Date.now(),
			x: point.clientX,
			y: point.clientY,
		})
	}

	end(point, context) {
		if (context.isTap) {
			this.dispatcher.dispatch('tap', {})
			clearTimeout(context.handler)

		}

		if (context.isPress) {
			this.dispatcher.dispatch('pressend', {})
		}

		context.points = context.points.filter(point => Date.now() - point.t < 500)
		let d, v
		if (!context.points.length) {
			v = 0
		} else {
			d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2)
			v = d / (Date.now() - context.points[0].t)
		}

		if (v > 1.5) {
			context.isFlick = true
			this.dispatcher.dispatch('flick', {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
				isFlick: context.isFlick,
				velocity: v,
			})
		} else {
			context.isFlick = false
		}

		if (context.isPan) {
			this.dispatcher.dispatch('panend', {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				isVertical: context.isVertical,
				isFlick: context.isFlick,
				velocity: v,
			})
		}

		this.dispatcher.dispatch('end', {
			startX: context.startX,
			startY: context.startY,
			clientX: point.clientX,
			clientY: point.clientY,
			isVertical: context.isVertical,
			isFlick: context.isFlick,
			velocity: v,
		})
	}

	cancel(point, context) {
		this.dispatcher.dispatch('cancel', {})
		clearTimeout(context.handler)
	}
}

class Dispatcher {
	constructor(element) {
		this.element = element
	}
	dispatch(type, properties) {
		const event = new Event(type)
		for (const p in properties) {
			event[p] = properties[p]
		}
		this.element.dispatchEvent(event)
	}
}

export function enableGesture(element) {
	new Listener(element, new Recognizer(new Dispatcher(element)))
}