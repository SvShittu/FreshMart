const express = require("express")
const {authMiddleware} = require("../middleware/authMiddleware")
const { startPayment, handleWebhook } = require("../controllers/paymentCtrl")
const router = express.Router()
const bodyParser = require("body-parser")

function rawBodySaver(req, res, buf){
    if(buf && buf.length){
    req.rawBody = buf.toString()
}
}
router.post("/pay", authMiddleware, startPayment)

router.post("/webhook", bodyParser.json({verify: rawBodySaver}), handleWebhook)
   


module.exports = router


