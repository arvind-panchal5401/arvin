import { body, validationResult } from "express-validator"



const vaildator = (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    return next()


}
export const registerValidator = [
    body('username').isString().trim().notEmpty().withMessage('username must be 3 and 30 characters').
        matches(/^[a-zA-Z0-9_]+$/).withMessage('username can contain only letters, numbers and underscores'),

    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('please provide a vaild email'),


    body('password').trim().notEmpty().withMessage('password is required').isLength({ min: 6 }).withMessage('password must be at lest 6 characters'),

    vaildator
]

export const loginValidator = [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('please provide a vaild email'),
    body('password').trim().notEmpty().withMessage('password is required').isLength({ min: 6 }).withMessage('password must be at lest 6 characters'),
    vaildator
]
