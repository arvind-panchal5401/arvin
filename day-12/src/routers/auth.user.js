const express = require('express')
const userModel = require('../models/user.model')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })
    if (isUserAlreadyExist) {
        res.status(400).json({
            message: 'user is already register'
        })
    }

    const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign({
        id: user._id,
        email: user.email
    },
        process.env.JWT_SECRET
    )
    res.cookie('jwt_token', token)
    res.status(201).json({
        message: "user is created sucessfully",
        user, token
    })
})

module.exports = authRouter