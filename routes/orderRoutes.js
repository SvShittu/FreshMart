const express = require("express")
const {authMiddleware} = require("../middleware/authMiddleware")
const { placeOrder, viewUsersOrder, getAllOrders } = require("../controllers/orderCtrl")
const role= require("../middleware/roleMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")
const router = express.Router()


router.post("/", authMiddleware, placeOrder)

router.get("/", authMiddleware, viewUsersOrder)

router.get("/admin",roleMiddleware("admin"), getAllOrders)



module.exports = router