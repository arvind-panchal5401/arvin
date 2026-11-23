import { Router } from "express";
import {registerValidator} from "../validation/auth.validator.js";
import { loginValidator } from "../validation/auth.validator.js";
import { loginController } from "../controllers/auth.controller.js";
import { regsiterController } from "../controllers/auth.controller.js";
import { getUserController } from "../controllers/auth.controller.js";
import { verifyEmailController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = Router()

authRouter.post('/register', registerValidator, regsiterController)
authRouter.post('/login', loginValidator, loginController)
authRouter.get('/get-user',authMiddleware, getUserController)

authRouter.get('/verify-email',verifyEmailController)

export default authRouter