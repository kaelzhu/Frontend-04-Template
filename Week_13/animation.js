const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tickHandler')
const ANIMATIONS = Symbol('animations')
const START_TIME = Symbol('startTime')
const PAUSE_START = Symbol('pauseStart')
const PAUSE_TIME = Symbol('pauseTime')

export class TimeLine {
	constructor() {
		this.state = 'Inited'
		this[ANIMATIONS] = new Set()
		this[START_TIME] = new Map()
	}
	start() {
		if (this.state !== 'Inited') { return }
		this.state = 'Started'
		let startTime = Date.now()
		this[PAUSE_TIME] = 0

		this[TICK] = () => {
			let now = Date.now()
			for (const animation of this[ANIMATIONS]) {
				let t
				if (this[START_TIME].get(animation) < startTime) {
					t = now - startTime - this[PAUSE_TIME] - animation.delay
				} else {
					t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay
				}
				if (animation.duration < t) {
					this[ANIMATIONS].delete(animation)
					t = animation.duration
				}
				if (t > 0) {
					animation.receive(t)
				}
			}
			this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
		}
		this[TICK]()
	}

	pause() {
		if (this.state !== 'Started') { return }
		this.state = 'Paused'
		this[PAUSE_START] = Date.now()
		cancelAnimationFrame(this[TICK_HANDLER])
	}
	resume() {
		if (this.state !== 'Paused') { return }
		this.state = 'Started'
		this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
		this[TICK]()
	}
	reset() {
		this.pause()
		this.state = 'Inited'
		let startTime = Date.now()
		this[TICK_HANDLER] = null
		this[ANIMATIONS] = new Set()
		this[START_TIME] = new Map()
		this[PAUSE_TIME] = 0
		this[PAUSE_START] = 0
	}
	add(animation, startTime = Date.now()) {
		this[ANIMATIONS].add(animation)
		this[START_TIME].set(animation, startTime)
	}
}

export class Animation {
	constructor(object, property, startValue, endValue, duration, delay, timingFunc, template) {
		this.object = object
		this.property = property
		this.startValue = startValue
		this.endValue = endValue
		this.duration = duration
		this.delay = delay
		this.timingFunc = timingFunc || (v => v)
		this.template = template || (v => v)
	}

	receive(time) {
		let range = this.endValue - this.startValue
		let progress = this.timingFunc(time / this.duration)
		this.object[this.property] = this.template(this.startValue + range * progress)
	}

}