const express = require('express')
const cookies = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const dns = require('dns')

dns.setServers(['8.8.8.8', '8.8.4.4'])


const app = express()
app.use(express.json())
app.use(cookies())
app.use('/api/auth', authRouter)
app.use('/api/posts',upload.single("image"), postRouter)

module.exports = app