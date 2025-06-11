const express = require("express")
const {authMiddleware} = require("../middleware/authMiddleware")
const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const { placeOrder, viewUsersOrder, getAllOrders } = require("../controllers/orderCtrl")
const role = require("../middleware/roleMiddleware")
const router = express.Router()


router.post("/", authMiddleware, placeOrder)

router.get("/", auth, viewUsersOrder)

router.get("/admin", auth, role("admin"), getAllOrders)



module.exports = router