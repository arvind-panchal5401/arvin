const userModel = require('../models/user.model')


const crypto = require('crypto')
const jwt = require('jsonwebtoken')

async function registerController(req, res) {

    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }

        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: 'This ' +
                (isUserAlreadyExists.email == email ? 'user email already exists' :
                    'user name already exists')
        })
    }

    const hashPassword = crypto.createHash('md5').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
        bio,
        profileImage

    })

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('token', token)
    res.status(201).json({
        message: 'user registered sucessfuuly',
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage

        }
    })



}
async function loginController (req, res) {
    const { username, email, password } = req.body
    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })
    if (!user) {
        res.status(404).json({
            message:'user not found'
        })
    }
    const hashPassword = crypto.createHash('md5').update(password).digest('hex')

    const isUserPasswordMatched = hashPassword === user.password
    if (!isUserPasswordMatched) {
        res.status(409).json({
            message:'Invalid password'
        })
    }

    const token = jwt.sign({
        id:user._id
    },
        process.env.JWT_SECRET, {
            expiresIn:'1d'
        }
    )

    res.cookie('token', token)

    res.status(201).json({
        message: 'user login sucessfully',
        user: {
            username: username,
            email: user.email,
            bio: user.bio,
            profileImage:user.profileImage
        }
        
    })

}

module.exports = {
    registerController,
    loginController
}