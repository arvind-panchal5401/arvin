
const jwt = require('jsonwebtoken')
const blacklsitModel = require('../models/blacklist.model')
const redis = require('../config/catche')

async function identifiyUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message: 'Token not provided'
        })
    }

    const istokenblacklist = await redis.get(token)

    if (istokenblacklist) {
        return res.status(401).json({
            message:'Invalid token'
        })
    }


    try {
        const decoded = jwt.verify(token,
            process.env.JWT_SECRET
        )

        req.user = decoded
        next()
    }
    catch (err) {
        return res.status(401).json({
            message: 'Invalid Token'
        })
    }

}
module.exports = {identifiyUser}