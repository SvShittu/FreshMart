const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const orderSchema = new mongoose.Schema({

   items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: {type:  Number}
    },
  ],
  total:{type: Number},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
})

module.exports = mongoose.model("Order", orderSchema)