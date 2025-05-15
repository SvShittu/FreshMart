const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({

username : {type: String, require: true, unique: true},
email: {type: String, require: true, unique: true},
password: {type: String, require: true},
role: {type: String, enum: ["user", "admin"], default: "user"},
token: {type: String, require: true}  
},
{
    timestamps: true
}
)

userSchema.pre("save", async(next)=>{
    if(!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password, 12)
    next()

})

userSchema.methods.matchPassword = async(enteredPassword)=>{
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = new mongoose.model("User", userSchema)
module.exports = User