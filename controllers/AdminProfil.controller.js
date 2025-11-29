import AdminUser from "../model/Admin.model.js";

// Create admin


export const createAdmin = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    const admin = await AdminUser.create({
      name,
      email,
      mobile,
      profilePic: req.file?.filename || null,
    });

    return res.json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get admin details
export const getAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    return res.json({ success: true, data: admin });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Update admin profile
export const updateAdmin = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    const updatedData = { name, email, mobile };

    if (req.file) {
      updatedData.profilePic = req.file.filename;
    }

    const admin = await AdminUser.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    return res.json({
      success: true,
      message: "Admin updated successfully",
      data: admin,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
