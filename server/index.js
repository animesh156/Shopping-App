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

const allowedOrigins = ['https://shopping-app-five-iota.vercel.app'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true,                         // Allow credentials (if needed)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/products',protect, productsRoute)
app.use('/user', userRoute)

app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`)
})