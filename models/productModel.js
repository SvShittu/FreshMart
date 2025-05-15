const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
name: {type: String, require: true, unique: true},
price: {type: Number},
stock: {type: Number},
category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"}
},
{
    timestamps: true
}
)


module.exports = mongoose.model("Product", productSchema)