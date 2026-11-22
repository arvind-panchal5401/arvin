const express = require('express')
const authController = require('../controllers/auth.controller')
const {identifiyUser} = require('../middleware/auth.middleware')
const authRouter = express.Router()

authRouter.post('/register', authController.registerController)
authRouter.post('/login', authController.loginController)
authRouter.get('/get-me', identifiyUser, authController.getMe)
authRouter.post('/logout',authController.logoutController)

module.exports = authRouter