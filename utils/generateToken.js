const jwt = require("jsonwebtoken")
const generateToken = (id) => {
    return jwt.sign({id}, processs.env.JWT_SECRET,{
        expiresIn: "30m"
    })
}



module.exports = generateToken