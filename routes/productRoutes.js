const express = require("express")
const Product = require("../models/productModel")
const{adminMiddleware, authMiddleware} = require("../middleware/authMiddleware")
const router = express.Router()






module.exports = router