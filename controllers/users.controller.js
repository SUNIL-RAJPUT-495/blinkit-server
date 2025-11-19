import bcryptjs from 'bcryptjs';
import UserModel from '../model/user.model.js';

export async function registerUserController(req, res) {
    try {
        const { Number } = req.body; // <--- req.body, not request.body

        if (!Number ) {
            return res.status(400).json({
                message: "Provide name",
                error: true,
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10);
       
        const newUser = new UserModel({mobile });
        const savedUser = await newUser.save();
        console.log("Saved user is :",savedUser);

        return res.json({
            message: "User registered successfully",
            error: false,
            success: true,
            data: savedUser
            
        });
        

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
