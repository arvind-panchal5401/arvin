const express = require('express')
const server = express()
server.get('/', (req, res) => {
    res.send('Hello World')
})


server.get('/about', function (req, res) {
    res.send('This is about pages...')
})
server.get('/home', (req, res) => {
    res.send('This is home paage')
})

server.listen(5401)
