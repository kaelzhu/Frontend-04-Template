// find 'abcdef'
function findStr(str) {
	foundA = false
	foundB = false
	foundC = false
	foundD = false
	foundE = false
	for (let c of str) {
		if (c == 'a') {
			foundA = true
		} else if (foundA && c == 'b') {
			foundB = true
		} else if (foundB && c == 'c') {
			foundC = true
		} else if (foundC && c == 'd') {
			foundD = true
		} else if (foundD && c == 'e') {
			foundE = true
		} else if (foundE && c == 'f') {
			return true
		} else {
			foundA = false
			foundB = false
			foundC = false
			foundD = false
			foundE = false
		}
	}
	return false
}

function match(str) {
	let state = start
	for (let c of str) {
		state = state(c)
	}
	return state === end
}

// find 'abababx'
function start(c) {
	if (c == 'a') {
		return foundA
	} else {
		return start
	}
}

function end(c) {
	return end
}

function foundA(c) {
	if (c == 'b') {
		return foundB
	} else {
		return start(c)
	}
}

function foundB(c) {
	if (c == 'a') {
		return foundA2
	} else {
		return start(c)
	}
}

function foundA2(c) {
	if (c == 'b') {
		return foundB2
	} else {
		return start(c)
	}
}

function foundB2(c) {
	if (c == 'a') {
		return foundA3
	} else {
		return start(c)
	}
}

function foundA3(c) {
	if (c == 'b') {
		return foundB3
	} else {
		return start(c)
	}
}

function foundB3(c) {
	if (c == 'x') {
		return end
	} else {
		return foundB2(c)
	}
}

console.log(match('abababababx') == true)
console.log(match('aaaabababc') == false)
