const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  placeOrder,
  viewUsersOrder,
  getAllOrders,
} = require("../controllers/orderCtrl");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


router.post("/", authMiddleware, placeOrder);


router.get("/my-orders", authMiddleware, viewUsersOrder);

router.get("/admin", authMiddleware, roleMiddleware("admin"), getAllOrders);

module.exports = router;