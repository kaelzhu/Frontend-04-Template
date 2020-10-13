function genKmpTable(pattern) {
	let table = Array(pattern.length).fill(0)
	let i = 1
	let j = 0
	while (i < pattern.length) {
		if (pattern[i] === pattern[j]) {
			table[i++] = ++j
		} else {
			if (j > 0) j = table[j - 1]
			else i++
		}
	}
	return table
}

// genKmpTable('aabaaaca')
// a  a  b  a  a  a  c  a
// 0, 1, 0, 1, 2, 2, 0, 1
// stateFunc => if (c == pattern[0]) func() else func1()
function genStateFunc(pattern) {
	let funcTable = Array(pattern.length)
	let kmpTable = genKmpTable(pattern)

	for (let i = 0; i < pattern.length; i++) {
		const c = pattern[i]
		funcTable[i] = function (w) {
			if (w == c) {
				return i === pattern.length - 1 ? end : funcTable[i + 1]
			} else {
				if (i == 0) return funcTable[0]
				if (kmpTable[i - 1]) return funcTable[kmpTable[i - 1]](w)
				return funcTable[0](w)
			}
		}
	}
	return funcTable
}

function end() {
	return end
}

// genStateFunc('aabaaaca')

function match(str, pattern) {
	if (pattern.length === 0) return false
	let funcTable = genStateFunc(pattern)
	let state = funcTable[0]

	for (const c of str) {
		state = state(c)
	}
	return state === end
}

// console.log(match('abc', 'bc'))
console.log(match('abc', ''))
console.log(match('', 'bc'))
// console.log(match('aabaabaac', 'aabaac'))
console.log(match('bbc abcdab abcdabcdabde', 'abcdabd'))
// a a d
// 0 1 0
