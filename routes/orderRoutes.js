const express = require("express")
const {authMiddleware} = require("../middleware/authMiddleware")
const { placeOrder, viewUsersOrder, getAllOrders } = require("../controllers/orderCtrl")
const roleMiddleware = require("../middleware/roleMiddleware")
const router = express.Router()


router.post("/placeOrder", authMiddleware , placeOrder)

router.get("/viewOrder", authMiddleware, viewUsersOrder)

router.get("/admin",roleMiddleware("admin"), getAllOrders)



module.exports = router