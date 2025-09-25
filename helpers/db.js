const mysql = require('mysql2')

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'o20h13',
	database: 'contact',
})

db.connect(err => {
	if (err) {
		console.error(`Error while connecting db,  error: ${err}`)
		return
	}

	console.log('Conncted successfully')
})

module.exports = db
