import uploadImageCloudinary from "../utils/uploadImageCloudnery.js";

// ================= SINGLE IMAGE =================
export const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image provided",
      });
    }

    const folder = req.body.folder || "blinkit/profiles";

    const uploaded = await uploadImageCloudinary(req.file, folder);

    res.status(201).json({
      success: true,
      data: { url: uploaded.secure_url, folder },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= MULTIPLE PRODUCT IMAGES =================
export const uploadProductImages = async (req, res) => {
  try {
    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images provided",
      });
    }

    const folder = req.body.folder || "blinkit/products";

    const uploadedImages = await Promise.all(
      files.map(file => uploadImageCloudinary(file, folder))
    );

    const urls = uploadedImages.map(img => img.secure_url);

    res.status(201).json({
      success: true,
      data: urls, // array of URLs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
