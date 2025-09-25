const express = require('express')
const { validationResult } = require('express-validator')
const router = express.Router()
const { getContacts, saveContacts } = require('../helpers/utils')
const { contactValidationRules } = require('../helpers/validator')
const db = require('../helpers/db')

router.get('/add', (req, res) => {
	res.render('add', { title: 'Main page' })
})

router.post('/add', contactValidationRules, (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const messages = errors.array().map(err => err.msg)
		req.session.message = {
			type: 'danger',
			message: messages.join(' | '),
		}
		return res.redirect('/contact/add')
	}
	const { name, email, phone } = req.body
	const id = global.crypto.randomUUID()
	db.query(
		'INSERT INTO user (id, name, email, phone) VALUES (?, ?, ?, ?)',
		[id, name, email, phone],
		(err, results) => {
			if (err) return res.status(500).json({ error: err.message })
			req.session.message = {
				type: 'success',
				message: 'Contact was created successfully',
			}
			res.redirect('/')
		}
	)
	const newContact = { id, name, email, phone }
})

router.get('/edit/:id', (req, res) => {
	const id = req.params.id
	db.query('SELECT * FROM user WHERE id= ?', [id], (err, results) => {
		if (err) return res.status(500).json({ error: err.message })

		if (results.length === 0) {
			return res.status(404).json({ message: 'Contact not found' })
		}
		res.render('edit', { title: 'Edit contact', contact: results[0] })
	})
})

router.post('/edit/:id', contactValidationRules, (req, res) => {
	const errors = validationResult(req)
	const id = req.params.id
	if (!errors.isEmpty()) {
		const messages = errors.array().map(err => err.msg)
		console.log(messages)

		req.session.message = {
			type: 'danger',
			message: messages.join(' | '),
		}
		return res.redirect(`/contact/edit/${id}`)
	}
	const { name, email, phone } = req.body
	db.query(
		'UPDATE user SET name = ?, email = ?, phone = ? WHERE id = ?',
		[name, email, phone, id],
		(err, result) => {
			if (err) return res.status(500).json({ error: err.message })
			req.session.message = {
				type: 'success',
				message: 'Contact was edited successfully',
			}
			res.redirect('/')
		}
	)
})

router.get('/delete/:id', (req, res) => {
	const id = req.params.id
	db.query('DELETE FROM user WHERE id = ?', [id], (err, results) => {
		if (err) return res.status(500).json({ error: err.message })
		req.session.message = {
			type: 'success',
			message: 'Contact was successfully',
		}
		res.redirect('/')
	})
})

module.exports = router
