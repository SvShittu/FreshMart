const User = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const generateToken = require("../utils/generateToken")

const register = async(req, res)=>{

    try {
        const{username, email, password, role} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "User already exists"})
        }

        //User Creation

        const user = new User({username, email, password, role})
        await user.save()
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(User._id),
            password: password,
            role: user.role
        })


    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}


const login = async(req, res)=>{
    const{email, password} = req.body
    try {
        const userr = await User.findOne({email})
        if(userr && (await userr.matchPassword(password))){
            return res.status(200).json({
                _id: User._id,
                username: User.username,
                email: User.email,
                token: generateToken(User._id)
            })
        }else {
            return res.status(401).json({message:"Invalid email or password"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const logout = async(req, res) => {
    res.send("logout user")
}

module.exports = {register, login, logout} 


// RESET PASSWORD
// DONT FORGET