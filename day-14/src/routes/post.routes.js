const express = require('express')
const postcontroller = require('../controllers/post.controller')
const identifiyUser = require('../middlewares/auth.middleware')
const postRouter = express.Router()

postRouter.post('/', identifiyUser, postcontroller.createpostController)


postRouter.get('/', identifiyUser, postcontroller.getpostController)

postRouter.get('/details/:postId', identifiyUser, postcontroller.getpostdeatilsController

)

module.exports = postRouter