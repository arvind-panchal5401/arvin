const jwt = require('jsonwebtoken')

async function identifiyUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: 'UnAuthorized access'
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (err) {
        return res.status(404).json({
            message: 'Invalid or expired token'
        })
    }

    req.user = decoded
    next()


}

module.exports = identifiyUser