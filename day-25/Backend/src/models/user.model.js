const mongosse = require('mongoose')
const userSchema = new mongosse.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique:[true,"username must be unique"]
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique:[true,'email must be unique']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        unique:[true,'password must be unique']
    }
})
const userModel = mongosse.model('user', userSchema)
module.exports =userModel