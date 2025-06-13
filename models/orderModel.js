const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const orderSchema = new mongoose.Schema({
   user: {type: mongoose.SchemaTypes.ObjectId, ref :"User"},
   items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: {type:  Number, require: true}
    },
  ],
  total:{type: Number, require: true},
  paidAt: {type: Date},
  isPaid: {type: Boolean, default: false},
  paymentInfo: {
    reference: String,
    channel: String,
    amount: Number
  },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
}, {timestamps: true })

module.exports = mongoose.model("Order", orderSchema)