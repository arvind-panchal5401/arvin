const app = require('./src/app')
require('dotenv').config()
const connectToDb = require('./src/config/database')
const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

app.listen('3001', (req, res) => {
    console.log('server is running on port 3001');

})

connectToDb()