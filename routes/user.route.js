const express = require('express')
const router = express.Router()

//CRUD

router.post('/', (req, res) => {
	res.json({ body: req.body, status: 'CREATE' })
})

router.get('/', (req, res) => {
	res.json({ body: [], status: 'READ' })
})

router.put('/:id', (req, res) => {
	res.json({ body: { id: req.params.id }, status: 'UPDATE' })
})

router.delete('/:id', (req, res) => {
	res.json({ body: { id: req.params.id }, status: 'DELETE' })
})

module.exports = router
