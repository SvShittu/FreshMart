const express = require("express")
const auth = require("../middleware/authMiddleware")
const Order = require("../models/orderModel")
const productModel = require("../models/productModel")

const router = express.Router()

//Place an order
router.post("/", auth, async(req, res) => {
const {items} = req.body
let total = 0

const populatedItems = await Promise.all(items.map(async(item) => {
const product = await productModel.findById(item.product)
if(!product) return rtatus(404).json({message: "Product not found"})

}))


})


// place an order 
router.post("/", auth, async(req, res)=>{
    const{items} = req.body
    let count = 0

    const populatedItems = await Promise.all(items.map(async(item)=> {
          const product = await Product.findById(item.product);
    if (!product) throw new Error('Product not found');
    total += product.price * item.quantity;
    return { product: product._id, quantity: item.quantity };
  }));

  const order = new Order({
    user: req.user.id,
    items: populatedItems,
    total,
  });

  await order.save();
  res.status(201).json(order);

  
    }))
})
module.exports = router