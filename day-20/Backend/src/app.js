const express = require('express')
const cookies = require('cookie-parser')
const app = express()

const cors = require('cors')

app.use(express.json())
app.use(cookies())
app.use(cors({
    credentials: true,
    origin:'http://localhost:5173'
}))

const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
const userrouter = require('./routes/user.routes')


app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/user', userrouter)

module.exports = app