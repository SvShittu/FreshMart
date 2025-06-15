const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const placeOrder = async (req, res) => {
  try {
    const { items } = req.body

    if (!items || !Array.isArray(items) ||  items.length === 0) {
      return res
        .status(400)
        .json({ message: "Order must include at least one item" });
    }

    let total = 0;
    const populatedItems = []

    for (const item of items) {
      const product = await Product.findById(item.product); 

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (item.quantity > product.stock) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.name}`,
        });
      }

      total += product.price * item.quantity;
      populatedItems.push({ product: product._id, quantity: item.quantity });

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      user: req.user.id,
      items: populatedItems,
      total,
    });

    await newOrder.save()

    res.status(201).json({
      message: "Order successfully placed",
      order: newOrder,
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const viewUsersOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }) 
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "userName email") 
      .populate("items.product")
      .sort({ createdAt: -1 })

    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  placeOrder,
  viewUsersOrder,
  getAllOrders,
}