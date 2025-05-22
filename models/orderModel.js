const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const orderSchema = new mongoose.Schema({
   user: {type: mongoose.SchemaTypes.ObjectId, ref :"User", require: true},
   items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: {type:  Number, require: true}
    },
  ],
  total:{type: Number, require: true},
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
}, {timestamps: true })

module.exports = mongoose.model("Order", orderSchema)