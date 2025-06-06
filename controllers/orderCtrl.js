const Order = require("../models/orderModel")
const Product = require("../models/productModel")
// place an order 
const placeOrder = async(req, res)=>{
  try {
    const{items} = req.body
    let total = 0
    const populatedItems = []
    for(const item of items){
      const product = await Prod.findById(item.Product)
      if(!product){
         res.status(404).json({message: "Product not found"})}
        if(items.quantity > product.stock) {
          return res.status(400).json({message: `Insufficient stock for product: ${product.name}`})
      }
     total += product.price * items.quantity
     populatedItems.push({product: product._id, quantity:items.quantity})
    

     // Reduce Stock
     product.stock -= items.quantity
     await product.save()
  } 
  const newOrder= new Order({
    user: req.user.id,
    items: populatedItems,
    total
  })
  await newOrder.save()
  res.status(201).json({message: "Order successfully placed", orderr})
} catch (error) { 
        res.status(500).json({message: error.message})
  }
}
//View User's Orders
const viewUsersOrder = async(req, res)=> {
  try {
    const orders = await Order.find()
    .populate("items.product")
    .sort({createdAt: -1})
    res.json(orders)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}


const getAllOrders = async(req, res)=>{
    try {
        const orders = await Order.find()
        .populate("items.product")
        .sort({createdAt: -1})
        res.status(orders)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
}

module.exports = {placeOrder, viewUsersOrder, getAllOrders}