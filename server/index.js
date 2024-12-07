const express = require('express')
const dotenv = require("dotenv").config();
const cors = require('cors')
const app = express();
const PORT = process.env.PORT
const connectDB = require('./config/db')
const productsRoute = require('./routes/productsRoute')
const userRoute = require('./routes/userRoute')
const {protect} = require('./middleware/authMiddleware')

connectDB()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/products',protect, productsRoute)
app.use('/user', userRoute)

app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`)
})
