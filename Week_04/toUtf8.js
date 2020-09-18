function toUtf(str) {
	let bytes = []
	for (let i = 0; i < str.length; i++) {
		const b = str.charCodeAt(i)
		if (b <= 0x007f) {
			bytes.push(b)
		} else if (b <= 0x07ff) {
			bytes.push([((b >> 6) & 0x1f) | 0xc0, (b & 0x3f) | 0x80])
		} else if (b <= 0xffff) {
			bytes.push([
				((b >> 12) & 0x0f) | 0xe0,
				((b >> 6) & 0x3f) | 0x80,
				(b & 0x3f) | 0x80,
			])
		} else if (b <= 0x10ffff) {
			bytes.push([
				((b << 18) & 0x07) | 0xf0,
				((b << 12) & 0x3f) | 0x80,
				((b << 6) & 0x3f) | 0x80,
				(b & 0x3f) | 0x80,
			])
		}
	}

	return bytes
}

console.log(toUtf('中文'))
