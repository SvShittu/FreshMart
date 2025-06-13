const express = require("express")
const {authMiddleware} = require("../middleware/authMiddleware")
const{intializePayment} = require("../utils/payStack")
const router = express.Router()
router.post("/pay", authMiddleware, async(req, res) => {
    try {
        const {amount} = req.body
        const email = req.user.email
        const payment = await intializePayment({email, amount})
        res.status(200).json(payment)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Payment intialization failed"})
    }
})

router.post("/webhook", express.json({verify: rawBodySaver}), async(req, res)=> {
    const event = req.body
    if(event.event === "charge.success"){
        const ref = event.data.refrence
        const email = event.data.customer.email
      //Mark order as paid using ref 
        console.log("Payment Successful for ", email )   
    }
    res.status.json(200)
})
function rawBodySaver(req, res, buf){
    req.rawBody = buf. toString()
}
module.exports = router


