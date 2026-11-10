const mongoose = require('mongoose')

const likepostSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required:[true,'PostId is required for post like']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:[true,'User id is required for post like']
    }

}, { timestamps: true })

likepostSchema.index({ post: 1, user: 1 }, { unique: true })

const likepostModel = mongoose.model('likes', likepostSchema)

module.exports = likepostModel

