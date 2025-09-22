const express = require('express')
const router = express.Router()
const { getContacts, saveContacts } = require('../helpers/utils')

router.get('/add', (req, res) => {
	res.render('add', { title: 'Main page' })
})

router.post('/add', (req, res) => {
	const contacts = getContacts()
	const { name, email, phone } = req.body
	const id = global.crypto.randomUUID()
	const newContact = {
		id,
		name,
		email,
		phone,
	}
	contacts.push(newContact)
	saveContacts(contacts)
	res.redirect('/')
})

router.get('/edit/:id', (req, res) => {
	const id = req.params.id
	res.render('edit', { id, title: 'Edit page' })
})

router.get('/delete/:id', (req, res) => {
	const id = req.params.id
	res.redirect('/')
})

module.exports = router
