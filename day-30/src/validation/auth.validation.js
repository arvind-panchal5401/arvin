import { body,validationResult } from "express-validator"

const validator = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }
    return res.status(400).json({
        errors: errors.array()
    })
}


export const registerValidation = [
    body("username").isString().withMessage("username shoud be a string"),
    body("email").isEmail().withMessage("email shoud ba a valid email address"),
    body("password").isLength({ min: 6, max:12 }).withMessage("password shoud be between 6 and 12 characters"),
    validator

] 
