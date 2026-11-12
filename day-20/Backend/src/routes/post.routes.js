const express = require('express')
const postcontroller = require('../controllers/post.controller')
const identifiyUser = require('../middlewares/auth.middleware')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const postRouter = express.Router()

postRouter.post('/', upload.single("image"), identifiyUser, postcontroller.createpostController)


postRouter.get('/', identifiyUser, postcontroller.getpostController)

postRouter.get('/details/:postId', identifiyUser, postcontroller.getpostdeatilsController)

postRouter.post('/like/:postId', identifiyUser, postcontroller.likepostController)
postRouter.post('/unlike/:postId', identifiyUser, postcontroller.unLikepostController)


postRouter.get('/feed',identifiyUser,postcontroller.getFeedController)

module.exports = postRouter