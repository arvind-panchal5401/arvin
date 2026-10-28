const express = require('express')
const userRouter = require('./routes/auth.route')
const cookies = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookies())
app.use('/api/auth',userRouter)

module.exports =app