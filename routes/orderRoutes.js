const express = require("express")
const auth = require("../middleware/authMiddleware")
const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const { placeOrder, viewUsersOrder, getAllOrders } = require("../controllers/orderCtrl")

const router = express.Router()


router.post("/", auth, placeOrder)

router.get("/", auth, viewUsersOrder)

router.get("/", auth, role("admin", getAllOrders))



module.exports = router