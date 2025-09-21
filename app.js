require('dotenv').config()

const express = require('express')

const app = express()
const usetRoutes = require('./routes/user.route')
const PORT = process.env.PORT

app.use(express.json()) //Body builder middleware comes  with Express

app.use('/users', usetRoutes)
app.use('/products', require('./routes/product.route'))
app.get('/', (req, res) => {
	res.redirect('/products')
})
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
