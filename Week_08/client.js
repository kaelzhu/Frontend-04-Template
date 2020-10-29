const images = require('images')
const net = require('net')
const parser = require('./parser')
const render = require('./render')

class Request {
	constructor(options) {
		this.method = options.method || 'GET'
		this.host = options.host
		this.port = options.port || 80
		this.path = options.path || '/'
		this.body = options.body || {}
		this.headers = options.headers || {}
		if (!this.headers['Content-Type']) {
			this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		}
		if (this.headers['Content-Type'] === 'application/json') {
			this.bodyText = JSON.stringify(this.body)
		} else if (
			this.headers['Content-Type'] === 'application/x-www-form-urlencoded'
		) {
			this.bodyText = Object.keys(this.body)
				.map(key => `${key}=${encodeURIComponent(this.body[key])}`)
				.join('&')
		}
		this.headers['Content-Length'] = this.bodyText.length
	}

	send(connection) {
		return new Promise((resolve, reject) => {
			if (connection) {
				connection.write(this.toString())
			} else {
				connection = net.createConnection(
					{
						host: this.host,
						port: this.port,
					},
					() => {
						// console.log(this.toString())
						connection.write(this.toString())
					}
				)
			}
			const parser = new ResponseParser()

			connection.on('data', data => {
				// console.log(data.toString())
				parser.receive(data.toString())
				if (parser.finished) {
					resolve(parser.response)
					connection.end()
				}
			})

			connection.on('error', err => {
				reject(err)
				connection.end()
			})
		})
	}

	toString() {
		// 一定要注意 space
		return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(
			this.headers
		)
			.map(key => `${key}: ${this.headers[key]}`)
			.join('\r\n')}\r\n\r\n${this.bodyText}`
	}
}

class ResponseParser {
	constructor() {
		this.current = this.waitingStatusLine
		this.statusLine = ''
		this.headers = {}
		this.headerName = ''
		this.headerValue = ''
		this.bodyParser = null
	}

	waitingStatusLine(char) {
		if (char == '\r') {
			return this.waitingStatusLineEnd
		} else {
			this.statusLine += char
			return this.waitingStatusLine
		}
	}

	waitingStatusLineEnd(char) {
		if (char == '\n') {
			return this.waitingHeaderName
		}
	}

	waitingHeaderName(char) {
		if (char == ':') {
			return this.waitingHeaderSpcae
		} else if (char == '\r') {
			if (this.headers['Transfer-Encoding'] === 'chunked') {
				this.bodyParser = new ChunkedBodyParser()
			}
			return this.waitingHeaderBlockEnd
		} else {
			this.headerName += char
			return this.waitingHeaderName
		}
	}

	waitingHeaderSpcae(char) {
		if (char == ' ') {
			return this.waitingHeaderValue
		}
	}

	waitingHeaderValue(char) {
		if (char == '\r') {
			this.headers[this.headerName] = this.headerValue
			this.headerName = ''
			this.headerValue = ''
			return this.waitingHeaderLineEnd
		} else {
			this.headerValue += char
			return this.waitingHeaderValue
		}
	}

	waitingHeaderLineEnd(char) {
		if (char == '\n') {
			return this.waitingHeaderName
		}
	}

	waitingHeaderBlockEnd(char) {
		if (char == '\n') {
			return this.waitingBody
		}
	}

	waitingBody(char) {
		this.bodyParser.receiveChar(char)
		if (!this.bodyParser.finished) {
			return this.waitingBody
		}
		return this.end
	}

	end() {
		return this.end
	}

	get finished() {
		return this.bodyParser && this.bodyParser.finished
	}

	get response() {
		return {
			statusCode: this.statusLine.split(' ')[1],
			statusText: this.statusLine.split(' ')[2],
			headers: this.headers,
			body: this.bodyParser.content.join(''),
		}
	}

	receive(string) {
		for (let i = 0; i < string.length; i++) {
			this.receiveChar(string.charAt(i))
		}
	}

	receiveChar(char) {
		this.current = this.current(char)
	}
}

class ChunkedBodyParser {
	constructor() {
		this.current = this.waitingLength
		this.length = 0
		this.content = []
		this.finished = false
	}

	waitingLength(char) {
		if (char == '\r') {
			if (this.length == 0) {
				this.finished = true
			}
			return this.waitingLengthEnd
		} else {
			this.length *= 16
			this.length += parseInt(char, 16)
			return this.waitingLength
		}
	}

	waitingLengthEnd(char) {
		if (char == '\n') {
			return this.readingChunk
		}
	}

	readingChunk(char) {
		this.content.push(char)
		this.length--
		if (this.length == 0) {
			return this.waitingNewLine
		}
		return this.readingChunk
	}

	waitingNewLine(char) {
		if (char == '\r') {
			return this.waitingNewLineEnd
		}
	}

	waitingNewLineEnd(char) {
		if (char == '\n') {
			return this.waitingLength
		}
	}

	receiveChar(char) {
		this.current = this.current(char)
	}
}

void (async function () {
	const request = new Request({
		method: 'POST',
		host: '127.0.0.1',
		port: 8088,
		path: '/',
		body: {
			Username: 'zhu',
			password: '123',
		},
	})
	const response = await request.send()
	// console.log(response)

	let dom = parser.parseHtml(response.body)

	let viewport = images(500, 300)

	render(viewport, dom.children[0].children[3].children[1].children[3])

	viewport.save('index.jpg')
	// console.log(dom)
})()
