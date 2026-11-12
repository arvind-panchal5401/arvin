const app = require('../Backend/src/app')
const connecteToDb = require('./src/config/database')

connecteToDb()

app.listen(3000, (req,res) => {
    console.log('server is running on port 3000');
    
})