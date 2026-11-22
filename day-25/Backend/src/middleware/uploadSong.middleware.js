const multer = require('multer')

const storage = multer.memoryStorage()

const uplaod = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*20
    }
})
module.exports = uplaod