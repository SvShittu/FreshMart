const jwt = require("jsonwebtoken")
const Users = require("../models/authModel")
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: "30m"
    })
}

const accessToken = (Users) => {
  return jwt.sign({Users}, process.env.ACCESS_TOKEN,{
                 expiresIn : "5m"
                
                })


  }

  const generateResetToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
  }

module.exports = {generateToken, accessToken, generateResetToken}