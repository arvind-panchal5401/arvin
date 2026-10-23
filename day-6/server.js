const app = require('./src/app')


const mongoose = require('mongoose')

function connectToDb() {

    mongoose.connect("mongodb+srv://arvind:ot5ZxtRwFDI2n14V@cluster0.bkw5r8y.mongodb.net/day-6")

        .then(() => {
            console.log('Connected to Database Sucessfully')
        })

}


connectToDb()
app.listen(3000, () => {
    console.log("server is connected sucessfully");


})