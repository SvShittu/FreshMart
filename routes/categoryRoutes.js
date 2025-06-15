const express = require("express")
const{createCategory, getAllCategories}= require("../controllers/categoryCtrls")
const Category = require("../models/categoryModel")
const{authMiddleware} = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = express.Router()
 
router.post("/", authMiddleware, roleMiddleware("admin"), createCategory)

router.get("/", getAllCategories)


module.exports = router