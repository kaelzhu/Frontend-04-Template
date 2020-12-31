const http = require('http')
const archiver = require('archiver')
const child_process = require('child_process')
const queryString = require('querystring')

// 1. https://github.com/login/oauth/authorize
child_process.exec(`xdg-open https://github.com/login/oauth/authorize?client_id=Iv1.b4d41238cb7e27b1`)

http.createServer((req, res) => {
	const query = queryString.parse(req.url.match(/^\/\?([\s\S]+)$/)[1])
	publish(query.token)
}).listen(8081)

function publish(token) {

	let request = http.request({
		hostname: '127.0.0.1',
		port: 8080,
		method: 'POST',
		path: '/publish?token=' + token, 
		headers: {
			'Content-Type': 'application/octet-stream',
			// 'Content-Length': stats.size,
		}
	},
		res => {
			let body = ''
			res.on('data', chunk => {
				body += chunk.toString()
			})
			res.on('end', () => {
				console.log(body)
			})
		}
	)

	const archive = archiver('zip', {
		zlib: { level: 9 } // Sets the compression level.
	})

	archive.pipe(request)

	archive.directory('./sample/', false)

	archive.finalize()
}
