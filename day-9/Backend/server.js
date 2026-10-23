const app = require('./src/app')
const connectTODb = require('./src/config/database')
const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

require('dotenv').config()

connectTODb()


app.listen(3000, () => {
    console.log('server is runinng on port 3000');
    
})