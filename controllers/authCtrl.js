const Users = require("../models/authModel")
const bcryptjs = require("bcryptjs")
const {generateToken} = require("../utils/generateToken");
const { sendForgotPasswordEmail } = require("../utils/sendMail");


const handleUserRegistration = async (req, res) => {
  try {
    const { userName, email, password, role = "user" } = req.body;

    if (!userName ||!email || !password) {
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


const handleLogin = async(req, res)=>{
    const{email, password} = req.body
    try {
        const user = await Users.findOne({email})
        if(user && (await user.matchPassword(password))){
            return res.status(200).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                token: generateToken(user._id)
            })
        }else {
            return res.status(401).json({message:"Invalid email or password"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

 const handleForgetPassword = async(req, res) => {
        const{email} = req.body
        try {
            const user = await Users.findOne({email})
            
            if(!user){
                return res.status(400).json({message : "User not found"})
            }
            // Send the user an email with their token 
          await sendForgotPasswordEmail(email, generateToken.accessToken)
          res.status(200).json({message: "Please check your email inbox"})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
            
    }


const handleResetPassword = async(req, res)=>{
    const {password} = req.body
     try {
        const user = await Users.findOne({email: req.user.email})
    if(!user){
        return res.status(404).json({message: "User account not found"})
    }
    const hashedPassword = await bcryptjs.hash(password, 12)
    user.password = hashedPassword
    await user.save()
    res.status(200).json({message: "Password Reset"})
    }

      catch (error) {
        return res.status(500).json({message: error.message})
     }
    }


   

    
const handleLogout = async(req, res) => {
    try {
        return res.status(200).json({message: "User successfully logged out"})
    } catch (error) {
        return res.status(500).json({message: "Logout failed"})
    }
    
}

module.exports = {
                handleUserRegistration,
                handleLogin,
                handleForgetPassword,
                handleResetPassword,
                handleLogout
             } 


