function string2Number(str) {
	let number = 0
	let hexNumbers = '0123456789abcdef'
	let octNumbers = '01234567'
	let binNumbers = '01'
	if (str.startsWith('0x')) {
		for (let i = str.length - 1; i >= 2; i--) {
			const v = str[i]
			number += Number(hexNumbers.indexOf(v)) * 16 ** (str.length - 1 - i)
		}
		return number
	}
	if (str.startsWith('0o')) {
		for (let i = str.length - 1; i >= 2; i--) {
			const v = str[i]
			number += Number(octNumbers.indexOf(v)) * 8 ** (str.length - 1 - i)
		}
		return number
	}
	if (str.startsWith('0b')) {
		// 0b101
		for (let i = str.length - 1; i >= 2; i--) {
			const v = str[i]
			number += Number(binNumbers.indexOf(v)) * 2 ** (str.length - 1 - i)
		}
		return number
	}
	return Number(str)
}

// console.log(
// 	string2Number('0xabc'),
// 	string2Number('0o777'),
// 	string2Number('0b101')
// )

function number2String(number, base) {
	let result = ''
	let num = Math.abs(number)
	let sign = number > 0 ? '' : '-'

	if (number == 0) return '0'

	switch (base) {
		case 2:
			while (num > 0) {
				if (num % 2) result = (num % 2) + result
				else result = 0 + result
				num >>= 1
			}
			break
		case 8:
			while (num > 0) {
				if (num % 8) result = (num % 8) + result
				else result = 0 + result
				num >>= 3
			}
			break
		case 16:
			while (num > 0) {
				if (num % 16) result = (num % 16) + result
				else result = 0 + result
				num >>= 4
			}
			break

		default:
			return String(num)
	}
	return sign + result
}

console.log(
	number2String(-0, 2),
	number2String(-256, 8),
	number2String(-256, 16),
	number2String(0)
)

function reduce(callback, initValue) {
	let arr = this
	let acc = initValue
	for (let i = 0; i < arr.length; i++) {
		const value = arr[i]
		acc = callback(acc, value, i, arr)
	}
	return acc
}

let arr = [1, 2, 3, 5]
arr.reduce((acc, item) => {
	acc += item
	return acc
}, 0)
