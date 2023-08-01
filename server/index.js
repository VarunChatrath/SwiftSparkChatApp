const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const messageRoute = require('./routes/messageRoute')
const socket = require('socket.io')

const app = express()
require("dotenv").config()

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoute)

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://Varun:fZDhVQyk5gXrku1e@cluster0.la6cbta.mongodb.net/?retryWrites=true&w=majority');

    console.log("DB connected successfully")
}

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT ${process.env.PORT}`)
})



