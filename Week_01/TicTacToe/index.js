// prettier-ignore
const pattern = [
	0, 0, 0,
	0, 0, 0,
	0, 0, 0,
]

let color = 1

const clone = function (pattern) {
	return Object.create(pattern)
}

// 创建格子
const createdCell = function (i, j) {
	const cell = document.createElement('div')
	cell.classList.add('cell')
	const value = pattern[i * 3 + j]
	cell.innerText = value == 0 ? '' : value == 1 ? '❌' : '⭕'
	return cell
}

// 创建棋盘
const createdBoard = function () {
	const board = document.createElement('div')
	board.classList.add('board')
	return board
}

// 输赢判断
const check = function (pattern, color) {
	for (let i = 0; i < 3; i++) {
		let win = true
		for (let j = 0; j < 3; j++) {
			if (pattern[i * 3 + j] !== color) {
				win = false
			}
		}
		if (win) return true
	}

	for (let i = 0; i < 3; i++) {
		let win = true
		for (let j = 0; j < 3; j++) {
			if (pattern[j * 3 + i] !== color) {
				win = false
			}
		}
		if (win) return true
	}

	{
		let win = true
		for (let i = 0; i < 3; i++) {
			if (pattern[i * 3 + i] !== color) {
				win = false
			}
		}
		if (win) return true
	}

	{
		let win = true
		for (let i = 0; i < 3; i++) {
			if (pattern[i * 2 + 2] !== color) {
				win = false
			}
		}
		if (win) return true
	}

	return false
}

const willWin = function (pattern, color) {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (pattern[i * 3 + j]) continue
			const tmp = clone(pattern)
			tmp[i * 3 + j] = color
			if (check(tmp, color)) {
				return [i, j]
			}
		}
	}

	return null
}

const bestChoice = function (pattern, color) {
	let point = willWin(pattern, color)
	if (point) {
		return {
			point: point,
			result: 1,
		}
	}

	// -1 0 1 策略的值
	let result = -2

	outer: for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (pattern[i * 3 + j]) continue
			const tmp = clone(pattern)
			tmp[i * 3 + j] = color
			let opp = bestChoice(tmp, 3 - color)
			if (-opp.result > result) {
				result = -opp.result
				point = [i, j]
			}
			if (result == 1) {
				break outer
			}
		}
	}

	return {
		point: point,
		result: point ? result : 0,
	}
}

// AI
const computerMove = function () {
	const choice = bestChoice(pattern, color)
	if (choice.point) {
		const [i, j] = choice.point
		pattern[i * 3 + j] = color
	}
	if (check(pattern, color)) {
		console.log(color == 1 ? 'winner is ❌' : 'winner is ⭕')
	}
	color = 3 - color
	show()
}

// 走棋
const userMove = function (i, j) {
	pattern[i * 3 + j] = color
	if (check(pattern, color)) {
		console.log(color == 1 ? 'winner is ❌' : 'winner is ⭕')
	}
	color = 3 - color
	show()

	computerMove()
	// console.log(bestChoice(pattern, color))

	// if (willWin(pattern, color)) {
	// 	console.log(color == 1 ? '❌ will win' : '⭕ will win')
	// }
}

const show = function () {
	document.querySelector('.board') &&
		document.querySelector('.board').remove()

	const board = createdBoard()

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			const cell = createdCell(i, j)
			cell.addEventListener('click', () => userMove(i, j))
			board.appendChild(cell)
		}
	}
	document.body.appendChild(board)
}

const __main = function () {
	show()
}

__main()
