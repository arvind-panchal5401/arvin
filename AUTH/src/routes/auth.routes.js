const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const crypto = require('crypto')

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const isUserExist = await userModel.findOne({ email })

    const hashPassword = crypto.createHash('md5').update(password).digest('hex')

    if (isUserExist) {
        return res.status(409).json({
            message: 'user already exist'
        })
    }
    const user = await userModel.create({
        name, email, password: hashPassword
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    )
    res.cookie('token', token)

    res.status(201).json({
        message: 'user registered sucessfully',
        user
    })


})

authRouter.post('/get-me', async (req, res) => {
    const token = req.cookies.token

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decode.id)

    res.status(201).json({
        message: 'token is here',
        user: user.name,
        email: user.email
    })
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(409).json({
            message:'user not found'
        })
    }
    const hashPassword = crypto.createHash('md5').update(password).digest('hex')
    const isPasswordMatched = hashPassword === user.password

    if (!isPasswordMatched) {
        return res.status(400).json({
            message:"Invaild password"
        })
    }
    const token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET, { expiresIn: '1h' })
    
    res.cookie('token', token)

    res.status(201).json({
        message:'user is login sucessfully'
    })
})

module.exports = authRouter

