const jwt = require("jsonwebtoken")
const generateToken = (id) => {
    return jwt.sign({id}, processs.env.JWT_SECRET,{
        expiresIn: "30m"
    })
}

const accessToken = await jwt.sign({user}, 
                 `${process.env.ACCESS_TOKEN}`,
                 {expiresIn : "5m"}


)



module.exports = {generateToken, accessToken}