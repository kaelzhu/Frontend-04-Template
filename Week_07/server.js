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
			response.writeHead(200, { 'Content-Type': 'text/plain' })
			let message = `<html maam>
	<head>
		<style>
			div {
				width: 100px;
				height: 100px;
				background-color: red;
			}
		</style>
	</head>
	<body>
		<div>hello world</div>
	</body>
</html>
`
			response.end(message)
		})
})

// server.keepAliveTimeout = 0
server.listen(8088)
