const monggose = require('mongoose')

const blacklistSchema = new monggose.Schema({
    token: {
        type: String,
        required:[true,'token is required for blacklisting']
    }

}, {
    timestamps:true
})

const blacklsitModel = monggose.model('blacklist', blacklistSchema)
module.exports =blacklsitModel