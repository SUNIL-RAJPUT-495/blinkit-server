import uploadImageCloudinary from "../utils/uploadImageCloudnery.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;
    const folder = req.body.folder || "blinkit/others";
    
    if (!file) {
      return res.status(400).json({
        message: "No file provided",
        success: false,
        error: true,
      });
    }
    const uploadImage = await uploadImageCloudinary(file, folder);

    return res.json({
      message: "Upload done",
      success: true,
      error: false,
      data: {
        url: uploadImage.secure_url,
        folder: folder,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
