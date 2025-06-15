const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({

userName : {type: String, required: true,unique: true, minlength: 4, maxlength: 20},
email: {type: String, required: true, unique: true},
password: {type: String, required: true, minlength: 6},
role: {type: String, enum: ["user", "admin"], default: "user"},
token: {type: String}  
},
{
    timestamps: true
}
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password, 12)
    next()

})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const Users = new mongoose.model("Users", userSchema)
module.exports = Users  