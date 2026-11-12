const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController(req, res) {
    const { username, email, password } = req.body;
    
    const isUserAlreadyExist = await userModel.find({
        $or: [
            { email },
            {password}
        ]
    })
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password:hashPassword
    })

    const token = jwt.sign({
        id: user._id,
        username:user.username
    },
    process.env.JWT_SECRET,{expiresIn:'3d'})
    
    res.cookie('token', token)
    return res.status(201).json({
        message: 'user register sucessfully',
        user: {
            id: user._id,
            username:user.username,
            email: user.email,
            
        }
    })
}
async function loginController(req, res) {
    
    const { username, email, password } = req.body;
    
    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
            
        ]
    })
    if (!user) {
        return res.status(404).json({
            message:'Invaild credentials'
        })
    }
    const hashPassword = await bcrypt.compare(password, user.password
    )
    if (!hashPassword) {
        return res.status(401).json({
            message:'Invalid credentails'
        })
    }
    const token = jwt.sign({
        id: user._id,
        username:user.username
    }, process.env.JWT_SECRET, { expiresIn: '3d' })
    
    res.cookie('token', token)
    return res.status(200).json({
        message: 'user login sucessfully',
        user: {
            id: user._id,
            username: user.username,
            email:user.email
        }
    })
    
}

module.exports={registerController,loginController}