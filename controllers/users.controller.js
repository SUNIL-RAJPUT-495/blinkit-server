import bcryptjs from 'bcryptjs';
import UserModel from '../model/user.model.js';
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplates.js';
import generateRefreshToken from '../utils/generaateRefreshToken.js';
import generateAccesToken from '../utils/generateAccesToken.js';

export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Provide name, email, password",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.json({
                message: "Email already registered",
                error: true,
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        const save = await newUser.save();

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;

        await sendEmail({
            sendTo: email,
            subject: "Verify email from Blinkit",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl
            })
        });

        return res.json({
            message: "User registered successfully",
            error: false,
            success: true,
            data: save
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function verifyEmailController(req,res) {
    try{
        const {code} =req.body;
        const user = await UserModel.findOne({_id : code})

        if(!user){
             return res.status(400).json({
                message : "Invalid code",
                error : true,
                success :false
        })
        }
        const updateUser = await UserModel.updateOne({_id : code},
            {verify_email: true})
            return res.json({
                message : "Verify email done",
                success : true,
                error:false
            })
    }
    catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
    
}

// login Controller

export async function loginController(req,res) {
    try{
        const { email, password} = req.body;


        if(!email || !password){
            return res.status(400).json({
                message : "Provide email ,password",
                error : true,
                success : false
            })
        }
        
        const user = await UserModel.findOne({email}).select("+password")
        if(!user){
            return res.status(400).json({
                message : "User not register",
                error : true,
                success: false
            });
        }
        if(user.status !== "Active"){
            return res.status(400).json({
                message : " Contact to Admin",
                error : true,
                success : false
            })
        }

        const checkPassword = await bcryptjs.compare(password,user.password)
        if(!checkPassword){
            return res.status(401).json({
                message : "Check your password",
                error:true,
                success: false
            })
        }

        const accesstoken = await generateAccesToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        const cookiesOption ={
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        res.cookie("accessToken",accesstoken,cookiesOption)
        res.cookie("refreshToken",refreshToken,cookiesOption)


        return res.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accesstoken,
                refreshToken
            }
        }
        )

    }
    catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success :false
        })
    }
    
}

// logout controlller

export async function logoutController(req,res) {
    try{}
    catch(error){
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }

    
}