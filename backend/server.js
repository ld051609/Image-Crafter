const express = require('express')
const cors = require('cors')
require('dotenv').config()

const cookieParser = require('cookie-parser') // cookie parser used to extract cookie from http request
const authRoute = require('./routes/authRoute') // import authRoute


const app = express()
const port = process.env.PORT || 5000
// Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

// Routes
app.use("/", authRoute)
// Initialize the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})