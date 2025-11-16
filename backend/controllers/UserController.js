const jwt = require("jsonwebtoken");
const User = require("../models/User");
const cibilkycs = require("../models/cibilkycs");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// POST /api/form - Submit form and create user if not existing
exports.submitForm = async (req, res) => {
  try {
    const { email, phone } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const data = new User(req.body);
    const savedData = await data.save();

    const token = jwt.sign({ id: savedData._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      message: "Form data saved successfully.",
      id: savedData._id,
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to save form data.",
      details: err,
    });
  }
};

// GET /api/form - Get user data (protected)
exports.getUserForm = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch form data.",
      details: err,
    });
  }
};

// PUT /api/form - Update user data (protected)
// exports.updateUserForm = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.user.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.status(200).json({
//       message: "User data updated successfully",
//       data: user,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "Failed to update form data.",
//       details: err,
//     });
//   }
// };

// Helper function to parse DD-MM-YYYY string to Date object
function parseDob(dobStr) {
  if (!dobStr) return null;
  const parts = dobStr.split("-");
  if (parts.length !== 3) return null;
  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
}

exports.updateUserprofile = async (req, res) => {
  try {
    const {userId, email, address, employmentType, employerName, monthlyIncome } = req?.body?.updateData;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        email,
        address,
        employmentType,
        employerName,
        monthlyIncome
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: error.message });
  }

};

// create user profile first time 

exports.createProfile = async (req, res) => {
  const { formData } = req.body;
  try {
    if (formData) {
      return res.status(401).json({ success: false, message: "User Data Not Provoded" })
    }
    console.log(formData);
  } catch (error) {

  }

}

exports.getUserProfile = async (req, res) => {
  const { id } = req?.params;
  try {
    if (!id) {
      return res.status(401).json({ message: "UserId is not Provided", success: false });
    }
    const userprofiledata = await cibilkycs.findOne({ userId:id });
    if (!userprofiledata) {
      return res.status(401).json({ message: "User not Found", success: false });
    }
    return res.status(200).json({ message: "User Dashboard Data Found Successfully", userprofiledata });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

