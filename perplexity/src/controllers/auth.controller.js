
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";

export async function regsiterController(req, res) {

    try {
        const { username, email, password } = req.body;

        // Check existing user
        const isUserAlreadyExist = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserAlreadyExist) {
            return res.status(409).json({
                message: 'User already exists with same username or email',
                success: false
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userModel.create({
            username,
            email,
            password: hashPassword
        });


        // Generate JWT token
        const token = jwt.sign({
            email: user.email,
        }, process.env.JWT_SECRET)


        // Send welcome email
        try {
            await sendEmail({
                to: email,
                subject: 'Welcome to our app',
                html: `
                    <h2>Welcome ${username}!</h2>
                    <p>Thank you for registering with our app.</p>
                    <p>please verify your email by clicking the link below:</p>
                    <a href="http://localhost:3000/api/auth/verify-email?token=${token}">Verify Email</a>
                    <br/>
                    <p>after clicking the link you will be redirected to the login page</p>
                    <br/>
                    <p>if you did not register with us, please ignore this email.</p>
                    <p>Best regards,</p>
                    <p>The Team</p> 


                `
            });

        } catch (emailError) {
            console.log('Email sending failed:', emailError.message);
        }

        return res.status(201).json({
            message: 'User created successfully',
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        console.log('Registration Error:', error);

        return res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error.message
        });
    }
}

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        // Check if password matches
        const isPasswordVaild = await bcrypt.compare(password, user.password)

        if (!isPasswordVaild) {
            return res.status(401).json({
                message: 'Invalid password',
                success: false
            });
        }

        // Check if email is verified
        if (!user.verified) {
            return res.status(403).json({
                message: 'Email not verified. Please verify your email before logging in.',
                success: false
            });


        }

        // Generate JWT token
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token)

        return res.status(200).json({
            message: 'Login successful',
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }


        })
    }
    catch (error) {
        console.log('Login Error:', error);
    }
}

export async function getUserController(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select('-password');

        return res.status(200).json({
            message: 'User fetched successfully',
            success: true,
            user
        });
    } catch (error) {
        console.log('Get User Error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}

export async function verifyEmailController(req, res) {
    try {
        const { token } = req.query;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        user.verified = true;

        await user.save();

        const htmlContent = `
            <h2>Email Verified Successfully!</h2>
            <p>Thank you for verifying your email.</p>
            <p>You can now log in to your account.</p>
            <a href="http://localhost:3000/login">Login</a>
        `;

        return res.status(200).send(htmlContent);



    }
    catch (error) {
        console.log('Email Verification Error:', error);

        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }

}

