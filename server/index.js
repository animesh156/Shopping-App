const express = require('express')
const dotenv = require("dotenv").config();
const cors = require('cors')
const app = express();
const PORT = process.env.PORT
const connectDB = require('./config/db')
const productsRoute = require('./routes/productsRoute')

connectDB()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/products', productsRoute)

app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`)
})