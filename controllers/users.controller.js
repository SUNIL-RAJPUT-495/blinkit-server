import bcryptjs from 'bcryptjs';
import UserModel from '../model/user.model.js';
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplates.js';
import generateRefreshToken from '../utils/generaateRefreshToken.js';
import generateAccesToken from '../utils/generateAccesToken.js';
import uploadImageClodinary from '../utils/uploadImageCloudnery.js';
import generatedOtp from '../utils/generatedOtp.js';
import forgotPasswardTemplate from '../utils/forgotPasswardTemplates.js';
import { response } from 'express';


// Registration 
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
      return res.status(400).json({
        message: "Email already registered",
        error: true,
        success: false
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const verificationEmailCode = generatedOtp()

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      verify_email: false,
      otp:verificationEmailCode
    });

    const save = await newUser.save();
    


    await sendEmail({
      sendTo: email,
      subject: "Verify email from Blinkit",
      html: verifyEmailTemplate({
        name,
        code: verificationEmailCode
      })
    });

    return res.json({
      message: "User registered successfully. Please verify your email.",
      error: false,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}



// veryifyEmail

export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        message: "Verification code is required",
        error: true,
        success: false
      });
    }

    const user = await UserModel.findOneAndUpdate(
      { otp: code },
      { verify_email: true, otp: null }, 
      { new: true }
    );

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired code",
        error: true,
        success: false
      });
    }

    return res.json({
      message: "Email verified successfully",
      error: false,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
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
    try{
        const userId = req.userId //middelware
        const cookiesOption ={
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }


        res.clearCookie("accesstoken",cookiesOption)
        res.clearCookie("refreshToken",cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId,{
            refreshToken: ""
        })  
        return res.json({
            message : "Logout successfully",
            error : false,
            success : true,
         })
    }
    catch(error){
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }

    
}




//upload user avatar 
export async function uploadAvatar(req, res) {
    try {
        const userId = req.userId;    // auth middleware
        const file = req.file;        // multer

        // 1️⃣ Check if multer received the image
        if (!file) {
            return res.status(400).json({
                message: "No image uploaded",
                error: true,
                success: false
            });
        }

        console.log("FILE RECEIVED:", file);

        // 2️⃣ Upload to Cloudinary using the BUFFER
        const uploadedImg = await uploadImageClodinary(file);

        // 3️⃣ Update user avatar
        await UserModel.findByIdAndUpdate(
            userId,
            { avatar: uploadedImg.secure_url },   // ✔ correct field!
            { new: true }
        );

        return res.json({
            message: "Profile image uploaded",
            data: {
                _id: userId,
                avatar: uploadedImg.secure_url
            },
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}



// update user details 
export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId;
        const { name, email, mobile, password } = req.body;
        
        let updateData = {
            ...(name && { name }),
            ...(email && { email }),
            ...(mobile && { mobile })
        };

        if (password) {
            const salt = await bcryptjs.genSalt(10);
            updateData.password = await bcryptjs.hash(password, salt);
        }

        // Fix: Changed _ID to _id
        const updateUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

        return res.json({
            message: "User updated successfully",
            error: false,
            success: true,
            data: updateUser
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true });
    }
}


//Forgot password
export async function forgotPasswordController(req,res) {
    try{console.log("BODY RECEIVED ===>", req.body);
        const {email} = req.body
          

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : "Email not avalable",
                error : true,
                success : false
            })
        }

        const otp = generatedOtp()
        const expireTime =  Date.now()+60*60*1000  //1hr

        const update = await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp :otp,
            forgot_password_expiry:new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo :email,
            subject:"Forgot password from Binkeyit",
            html:forgotPasswardTemplate({
                name :user.name,
                otp:otp
            })
        })


        return res.json({
            message: "check your email",
            error:false,
            success:true
        })


    }catch(error){
        return res.status(500).json({
            message: error.message||error,
            error:true,
            success:false
        })
    }
    
}


// verify forgot password otp 

export async function verifyForgotPasswordOtp(req, res) {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Provide required fields: email, otp.",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            });
        }

        const currentTime = new Date();

        if (new Date(user.forgot_password_expiry) < currentTime) {
            return res.status(400).json({
                message: "Otp is expired",
                error: true,
                success: false
            });
        }

        if (otp !== user.forgot_password_otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            });
        }

        return res.json({
            message: "OTP verified successfully",
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


// reset the passward

export async function resetPassword(req,res) {
    try{
        const {email,newPassword,conformPassward} =req.body
        
console.log("BODY => ", req.body);

        if(!email ||!newPassword||!conformPassward){
            return res.json({
                message:"Provide required fields email ,passward,conformpassword",
                error:true,
                success:false
            })
        }
        const user = await UserModel.findOne({email})


        if(!user){
            return res.status(400).json({
                message:"Email is not avalable",
                error:true,
                success:false
            })
        }
        if(newPassword !== conformPassward){
            return res.status(400).json({
                message:"new password and conform password is not same",
                error :true,
                success:false
            })
        }


        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword,salt)
        const update = await UserModel.findOneAndUpdate(user._id,{
            password: hashPassword
        })


        return res.json({
            message:"Password added succesfully",
            error:false,
            success:true
        })


    }catch(error){
        return res.status(500).json({
            message:error.message ||error,
            error:true,
            success:false
        })

    }
    
}