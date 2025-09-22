require('dotenv').config()

//Libraries
const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const path = require('path')
const { getContacts } = require('./helpers/utils')

const PORT = process.env.PORT

//View Engine config
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.get('/', (req, res) => {
	const contacts = getContacts()
	res.render('home', { title: 'Main page', contacts })
})

app.use('/contact', require('./routes/contact.route'))

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
