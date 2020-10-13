const http = require('http')

const server = http.createServer((request, response) => {
	let body = []
	request
		.on('error', err => {
			console.error(err)
		})
		.on('data', chunk => {
			body.push(chunk)
		})
		.on('end', () => {
			body = Buffer.concat(body).toString()
			console.log(body)
			response.writeHead(200, { 'Content-Type': 'text/html' })
			response.end(' Hello world\n!!!')
		})
})

// server.keepAliveTimeout = 0
server.listen(8088)
