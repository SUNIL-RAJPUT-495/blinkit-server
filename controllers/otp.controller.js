import twilio from "twilio";
const Clint = twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH);
export const generateOtpController = async (req,res)=>{
    try{
        const {Number} =req.body;
        if(!Number){
            return res.json({message:"Mobile number required",success:false});
        }

        //4-DIGIT OTP
        const otp = Math.floor(1000+Math.random()*9000);
        //Send SMS

        await Clint.messages.create({
            body:`Your OTP is ${otp}`,
            from: process.env.TWILIO_NUMBER,
            to:`+91${Number}`,
        });
        console.log("OTP sent:",otp)
        return req.json({
            message:"OTP sent successfully",
            otp,
            success:true,
        });

    }catch(error){
        return res.status(500).json({
            message:error.message,
            success:false,
        })
    }
}