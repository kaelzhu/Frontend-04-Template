function kmp(source, pattern) {
	let table = Array(pattern.length).fill(0)
	{
		let i = 1
		let j = 0
		while (i < pattern.length) {
			if (pattern[i] === pattern[j]) {
				i++
				j++
				i < pattern.length && (table[i] = j)
			} else {
				if (j > 0) j = table[j]
				else i++
			}
		}
		console.log(table)
	}
	{
		let i = 0
		let j = 0
		while (i < source.length) {
			if (source[i] === pattern[j]) {
				i++, j++
			} else {
				if (j > 0) j = table[j]
				else i++
			}
			if (j === pattern.length) return true
		}
		return false
	}
}
// console.log(kmp('aaabaaacaa', 'aabaaac'))
// console.log(kmp('abc', 'abc'))
// console.log(kmp('abc', 'aa'))
console.log(kmp('', 'aabaaaca'))
