const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


const authMiddleware = async (req, res, next)=>{
     let token
  if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
    try {
      token = request.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      request.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      response.status(401).json({ message: 'Not authorized, token failed' })
    }
  }
  if (!token) {
    response.status(401).json({ message: 'Not authorized, no token' })
  }
}
const adminMiddleware = (req, res, next)=> {
    if(req.user.role !== "admin"){
        res.status(403).json({message:"Forbidden"})
        next()
    }
}


const validateRegistration = async(request, response, next) =>{
  const{username, email, password} = request.body

  const errors = []

  if(!username){
    errors.push("Please add your UserName")
  }
  if(!email){
    errors.push("Please add your email")
  } else if(!validEmail(email)){
    errors.push("email format is incorrect")
  }
  

  if(password.length < 8){
    errors.push("Minimum of eight characters required for password")
  }

if(errors.length > 0 ){
  return response.status(400).json({message: errors})
}
next()
}


// validateLogin
const validateLogin = async(request, response, next) =>{
  const{email, password} = request.body
  const errors = []
  if(!email){
    errors.push("Please add your email")
  } else if(!validEmail(email)){
    errors.push("email format is incorrect")
  }
if(!password){
  errors.push("Please add your password")
}
if(errors.length > 0){
  return response.status(400).json({message: errors})
}

next()

}


// validate Email with RegEx
function validEmail(email){
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(String(email).toLowerCase())
}


module.exports = {authMiddleware, adminMiddleware, validEmail, validateLogin, validateRegistration}