const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'User name already exist'],
        require :[true, 'Username is required']
    },
    email: {
        type: String,
        unique: [true, 'User email already exist'],
        require:[true,'user email is required']
    },
    password: {
        type: String,
        require:[true,'user password is required']
    },
    bio: String,
    profileImage: {
        type: String,
        default:'https://ik.imagekit.io/u0tvfr76m/user%20defauit%20img.webp'
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports =userModel