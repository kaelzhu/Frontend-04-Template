import { TimeLine, Animation } from './animation.js'

const tl = new TimeLine()
tl.add(new Animation(document.querySelector('#el').style, 'transform', 0, 800, 4000, 0, null, v => `translateX(${v}px)`))
tl.start()

document.querySelector('#pause-btn').addEventListener('click', () => tl.pause())
document.querySelector('#resume-btn').addEventListener('click', () => tl.resume())