
require('dotenv').config()
const app = require('./src/app')
const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])



const connectToDb = require('./src/config/database')
connectToDb()

app.listen(3001, () => {
    console.log('server is running on port 3001');
    
})