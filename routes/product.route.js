const path = require('path')
const express = require('express')
const router = express.Router()

//CRUD

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../', 'views', 'product.html'))
})

router.get('/add', (req, res) => {
	res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
})

module.exports = router
