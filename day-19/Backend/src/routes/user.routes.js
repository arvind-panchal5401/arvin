const express = require('express')

const followController = require('../controllers/user.controller')
const identifiyUser = require('../middlewares/auth.middleware')

const userRouter = express.Router()

userRouter.post('/follow/:userId', identifiyUser, followController.followUserController)
userRouter.post('/unfollow/:userId', identifiyUser, followController.unfollowUserController)
userRouter.patch('/follow/:followId/status', identifiyUser, followController.upadatefollowrequestController)


module.exports = userRouter