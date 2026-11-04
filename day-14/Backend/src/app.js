const express = require('express')
const cookies = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookies())
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
const userrouter = require('./routes/user.routes')


app.use('/api/auth', authRouter)
app.use('/api/posts', upload.single("image"), postRouter)
app.use('/api/user', userrouter)

module.exports = app