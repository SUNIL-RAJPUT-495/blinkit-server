import customerUserModel from "../model/customerUser.model.js"

export const customerUser = async (req, res) => {

    const { Number } = req.body
    if (!Number) {
        return res.status(400).json({
            message: "provide mobile number",
            error: true,
            success: false

        })
    }
    if (Number.length !== 10) {
        return res.status(400).json({
            message: "provide cortrect mobile number",
            error: true,
            success: false
        })
    }
    const saveuser = new customerUserModel({
        mobile: Number,
        otp:"123456"
    })
    const saved = await saveuser.save();
    return res.status(201).json({
        message: "User saved successfully",
        success: true,
        data: saved
    });


}

export const verifycustomerOtp = async (req, res) => {
    try {
        const { Number, otp } = req.body

        if (!otp) {
            return res.status(400).json({
                message: "provide otp",
                success: false,
                error: true
            })
        }

        const user = await customerUserModel.findOne({ mobile: Number })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            })
        }

        
        if (String(otp) !== String(user.otp)) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Please enter a correct otp"
            })
        }

        user.verify_otp = true
        user.otp = "" 
        await user.save()
        const token = jwt.sign(
            { id: user._id }, 
            process.env.SECRET_KEY_ACCESS_TOKEN, 
            { expiresIn: '7d' }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };
        res.cookie('accessToken', token, cookieOptions);

        return res.status(200).json({
            message: "otp verified successfully",
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true });
    }
}