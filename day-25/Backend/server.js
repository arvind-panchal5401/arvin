const app = require('../Backend/src/app')
const connecteToDb = require('./src/config/database')
const dns = require('dns')

dns.setServers(['8.8.8.8', '8.8.4.4'])



connecteToDb()

app.listen(3000, (req,res) => {
    console.log('server is running on port 3000');
    
})