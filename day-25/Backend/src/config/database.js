const mongoose = require('mongoose')

function connecteToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('connect to DB');
        })
        .catch(err => {
            console.log('Error connect to DB', err);

        })
}
module.exports = connecteToDb