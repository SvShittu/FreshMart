const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const orderSchema = new mongoose.Schema({
   user: {type: mongoose.SchemaTypes.ObjectId, ref :"Users"},
   items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: {type:  Number,
        required: true,
        min: [1, "Quantity must be at least 1"],

      }
    },
  ],
  total:{type: Number,
     required: true,
      min: [0, "Total must be positive"],},
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