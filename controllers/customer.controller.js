import customerUserModel from "../model/customerUser.model.js"

export const customerUser = async(req,res)=>{

    const {Number}= req.body
    if(!Number){
        return res.status(400).json({
            message:"provide mobile number",
            error :true,
            success:false

        })
    }
    if(Number.length!==10){
        return res.status(400).json({
            message:"provide cortrect mobile number",
            error:true,
            success:false
        })
    }
    const saveuser = new customerUserModel({
        mobile:Number
    })
      const saved = await saveuser.save();
       return res.status(201).json({
      message: "User saved successfully",
      success: true,
      data: saved
    });
    

}

const verifycustomerOtp = async (req,res)=>{
    const {Number,otp} = req.body
    if(!otp){
        return res.status(400).json({
            message:"provide otp",
            success:false,
            error:true
        })
    }

    const user = await customerUserModel.findOne({Number})

    if(otp !== user.otp){
        return res.status(400).json({
            error:true,
            success:false,
            message:"Please enter a correct otp"

        })
    }

    



}