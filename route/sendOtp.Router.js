import {Router} from "express"
import { generateOtpController } from "../controllers/otp.controller.js"
const otpRouter = Router();

otpRouter.post("/send",generateOtpController)
export default otpRouter;