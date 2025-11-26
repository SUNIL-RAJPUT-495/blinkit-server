export const createAdmin = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const file = req.file;

    const admin = await Admin.create({
      name,
      email,
      mobile,
      profilePic: file?.filename || null
    });

    return res.json({
      success: true,
      message: "Admin created successfully",
      data: admin
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


//get admin details

export const getAdmin = async (req,res)=>{
    try{
        const admin = await admin.findByiD(req.params.id);
        return res.json({success:true,data:admin});
    }
    catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
};


// update admin profile

export const updateAdmin = async (req,res)=>{
    try{
        const {name ,email,mobile} = req.body;
        const file = req.file;

        const updatedData = {name,email,mobile};
        if(file){
            updatedData.profilePic = file.filename;
        }

        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new:true}

        );
        return res.json({
            success:true,
            message:"Admin updates successfully",
            data :admin
        });
    }
    catch(err){
        return res.status(500).json({success:false,message:err.message})
    }

};