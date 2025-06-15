const Users = require("../models/authModel")
const bcryptjs = require("bcryptjs")
const {generateToken, generateResetToken} = require("../utils/generateToken")
const {sendForgotPasswordEmail} = require("../utils/sendMail");
const jwt = require("jsonwebtoken");



const handleUserRegistration = async (req, res) => {
  try {
    const { userName, email, password, role = "user" } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const user = new Users({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    return res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
  

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords directly
    const isMatch = await bcryptjs.compare(password, user.password);

    if (isMatch) {
      return res.status(200).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
  
   
const handleForgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = generateResetToken(email);

   
    const resetLink = `https://yourfrontend.com/reset-password/${token}`;

    
    await sendForgotPasswordEmail(email, resetLink);

    res.status(200).json({ message: "Please check your email inbox" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const handleResetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User account not found" });
    }

  
    const hashedPassword = await bcryptjs.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ message: "Reset token expired. Please request a new one." });
    }
    return res.status(500).json({ message: error.message });
  }
};

    
const handleLogout = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
                handleUserRegistration,
                handleLogin,
                handleForgetPassword,
                handleResetPassword,
                handleLogout
             }