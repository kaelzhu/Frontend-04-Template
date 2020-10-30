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
			let message = `<html maam>
	<head>
		<style>
			#container {
				width: 500px;
				height: 300px;
				display: flex;
				background-color: rgb(255,0,0);
			}
			#myid {
				width: 200px;
				height: 100px;
				background-color: rgb(255,255,0);
			}
			.myclass {
				flex: 1;
				background-color: rgb(255,0,255);
			}
		</style>
	</head>
	<body>
		<div id="container">
			<div id="myid"></div>
			<div class='myclass'></div>
		</div>
	</body>
</html>
`
			response.end(message)
		})
})

// server.keepAliveTimeout = 0
server.listen(8088)
