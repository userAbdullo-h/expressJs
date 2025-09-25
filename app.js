require('dotenv').config()

//Libraries
const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const path = require('path')
const { getContacts } = require('./helpers/utils')
const session = require('express-session')
const db = require('./helpers/db')

const PORT = process.env.PORT

//View Engine config
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: true,
	})
)
app.use((req, res, next) => {
	res.locals.message = req.session.message
	delete req.session.message
	next()
})

//Routes
app.get('/', (req, res) => {
	db.query('SELECT * FROM user', (err, results) => {
		if (err) return res.status(500).json({ error: err.message })
		res.render('home', {
			title: 'Main page',
			contacts: results,
			views: req.session.views,
		})
	})
	// const contacts = getContacts()
	// r
})

app.use('/contact', require('./routes/contact.route'))

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
