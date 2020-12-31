const http = require('http')
const https = require('https')
const unzipper = require('unzipper')
const queryString = require('querystring')

// router auth
function auth(req, res) {
	const query = queryString.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1])
	tokenFromGithub(query.code, info => {
		res.write(`<a href='http://localhost:8081/?token=${info.access_token}'>publish</a>`)
		res.end()
	})
}

function tokenFromGithub(code, callback) {
	// auth router: code + client_id + client_secret => token
	// https://github.com/login/oauth/access_token
	let request = https.request({
		hostname: 'github.com',
		port: 443,
		path: `/login/oauth/access_token?code=${code}&client_id=Iv1.b4d41238cb7e27b1&client_secret=78427e5cd52d44ef23ff00e5efbac45d369d40e6`,
		method: 'POST',
	}, (res) => {
		let body = ''
		res.on('data', chunk => {
			body += chunk.toString()
		})
		res.on('end', () => {
			callback(queryString.parse(body))
		})
	})
	request.end()
}

// router publish
function publish(req, res) {
	const query = queryString.parse(req.url.match(/^\/publish\?([\s\S]+)$/)[1])
	userInfoFromGithub(query.token, info => {
		// authentication => publish
		if (info.login === 'kaelzhu') {
			req.pipe(unzipper.Extract({ path: '../server/public/' }))
			req.on('end', () => {
				res.end(`<div>Publish successed!</div>`)
			})
		} else {
			res.end(`<div>Not Authenticated</div>`)
		}
	})
}

function userInfoFromGithub(token, callback) {
	// token => user_info https://api.github.com/user
	let request = https.request({
		hostname: 'api.github.com',
		port: 443,
		path: '/user',
		method: 'GET',
		headers: {
			Authorization: `token ${token}`,
			'User-Agent': 'toy-publish',
		}
	}, (res) => {
		let body = ''
		res.on('data', chunk => {
			body += chunk.toString()
		})
		res.on('end', () => {
			callback(JSON.parse(body))
		})
	})
	request.end()
}

http.createServer((req, res) => {
	if (req.url.match(/^\/auth\?/)) {
		return auth(req, res)
	}
	if (req.url.match(/^\/publish\?/)) {
		return publish(req, res)
	}

}).listen(8080)