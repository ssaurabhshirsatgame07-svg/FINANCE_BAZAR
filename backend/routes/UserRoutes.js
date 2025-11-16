const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const auth = require("../middlewares/authMiddleware");

// POST: Add user form data
router.post("/add-user", userController.submitForm);

// GET: Get user data (requires valid JWT in Authorization header)
router.get("/get-user", auth, userController.getUserForm);

// PUT: Update user data (requires valid JWT in Authorization header)
// router.put("/update-user", auth, userController.updateUserForm);

router.put("/updateprofile", userController.updateUserprofile);

router.post("/createprofile",userController.createProfile);
router.get("/getprofile/:id",userController.getUserProfile);



module.exports = router;
