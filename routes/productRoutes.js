const express = require("express")
const Product = require("../models/productModel")
const{adminMiddleware, authMiddleware} = require("../middleware/authMiddleware")
const router = express.Router()

//Users can browse products ans view product details
router.get("/", async(req, res) =>{
    const products = await Product.find().populate("category")
    res.json(products)
} )


router.get("/:id", async(req, res) => {
    const product = await Product.findById(req.params.id).populate("category")
    if(!product) return res.status(404).json({message: "Product not found"})
    
})






module.exports = router