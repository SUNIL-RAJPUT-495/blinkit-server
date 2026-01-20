// controllers/addressController.js

import AddressModel from "../model/address.model.js";

export const saveAddress = (req, res) => {
  try {
    const { form } = req.body;
     const { houseNo, landmark, receiverName, receiverNumber,pincode ,floor ,area} = form;

    if (!houseNo || !landmark || !receiverName || !receiverNumber ||!pincode) {
      return res.status(400).json({
         success: false, 
         message: "All required fields must be filled" });
    }

    if (receiverNumber.length !== 10) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid mobile number" 
    });
    }
    const address_line = `${houseNo},${floor},${area}, ${landmark}, ${pincode}`;
    const saveAddresss = AddressModel({
        address_line,
        name:receiverName,
        mobile:receiverNumber
    })
    console.log(saveAddresss)


  

    return res.status(200).json({ 
        success: true, 
        message: "Address saved successfully"
     });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
        success: false, 
        message: "Server error" 
    });
  }
};
