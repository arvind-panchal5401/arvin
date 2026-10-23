const mongoose = require('mongoose')



function connectTODb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
        console.log("DB connected sucessfully");
        
    })
}

module.exports =connectTODb