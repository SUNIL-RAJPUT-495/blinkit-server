const axios = require('axios');

exports.sendWhatsAppOTP = async (req, res) => {
    const { phoneNumber } = req.body; 


    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    

    const url = `https://graph.facebook.com/v22.0/${process.env.WA_PHONE_NUMBER_ID}/messages`;

    try {
        const response = await axios.post(url, {
            messaging_product: "whatsapp",
            to: phoneNumber,
            type: "template",
            template: {
                name: "hello_world", 
                language: { code: "en_US" }
            }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.WA_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        // 3. Success response
        res.status(200).json({ 
            success: true, 
            message: "OTP sent successfully!",
            otp: otp // Real project mein isey sirf console.log karna ya DB mein save karna
        });

    } catch (error) {
        console.error("WhatsApp API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            success: false, 
            error: error.response ? error.response.data : "Internal Server Error" 
        });
    }
};