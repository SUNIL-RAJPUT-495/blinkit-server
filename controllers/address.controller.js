import AddressModel from "../model/address.model.js";

export const saveAddress = async (req, res) => {
  try {
    const { form } = req.body;
    const { houseNo, landmark, receiverName, receiverNumber, pincode, floor, area } = form;


    if (!houseNo || !landmark || !receiverName || !receiverNumber || !pincode) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    if (receiverNumber.length !== 10 || !/^\d+$/.test(receiverNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    const address_line = `${houseNo}${floor ? ", " + floor : ""}, ${area ? area + ", " : ""}${landmark}, ${pincode}`;

    const saveAddresss = new AddressModel({
      address_line,
      name: receiverName,
      mobile: receiverNumber,
    });

    await saveAddresss.save(); 

 

    return res.status(200).json({
      success: true,
      message: "Address saved successfully",
      data: saveAddresss,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const Address = (req,res)=>{
    
}