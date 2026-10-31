const express = require('express')
const { models } = require('mongoose')
const authController = require('../controllers/auth.controller')

const authRouter = express.Router()

authRouter.post('/register', authController.registerController )

authRouter.post('/login', authController.loginController )




module.exports = authRouter