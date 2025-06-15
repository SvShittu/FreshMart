const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;

    if (!name || !price || !stock || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Product.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Product already exists" });
    }

    const product = new Product({ name, price, stock, category });
    await product.save();

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock, category },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}