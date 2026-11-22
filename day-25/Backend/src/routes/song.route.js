const express = require('express')
const songController = require('../controllers/song.controller')
const upload = require('../middleware/uploadSong.middleware')
const songRouter = express.Router()


songRouter.post('/', upload.single("song"), songController.uploadSong)
songRouter.get('/',songController.getSong)


module.exports = songRouter