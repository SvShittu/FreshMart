const express = require("express")

const Category = require("../models/categoryModel")
const{adminMiddleware} = require("../middleware/authMiddleware")

const router = express.Router()





module.exports = router