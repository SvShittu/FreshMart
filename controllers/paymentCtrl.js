 const { initializePayment, verifyPayment,} = require("../utils/payStack")
 const Order = require("../models/orderModel")
 const crypto = require("crypto")
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

 const startPayment = async(req, res) => {
 try {
    const { email, amount, orderId} = req.body
    const payment = await initializePayment ({
        email,
        amount,
        userId: req.user._id,
        orderId
    })
    res.json({url : payment.authorization_url})
} catch (error) {
res.status(500).json({message: " Payment initialization failed"})
 }
 }
const handleWebhook = async(req, res) =>  {
try{
    const hash = crypto
        .createHmac("sha512", PAYSTACK_SECRET_KEY)
        .update(req.rawBody)
        .digest("hex")
     if(req.headers["x-paystack-signature"] !== hash){
        return res.status(401).json({message: "Invalid signature"})
     } 
    const event = req.body
    if(event.event === "charge.success"){
        const ref = event.data.reference
        const payment = await verifyPayment(ref)
        const  orderId  = payment.metadata.orderId
        const order = await Order.findById(orderId)
        if(order && !order.isPaid){
            order.isPaid = true
            order.paidAt = new Date()
            order.paymentInfo = {
                reference: ref,
                channel: payment.channel,
                amount: payment.amount / 100

            }
            await order.save()
            
        }
    }
   res.status(200).json({message:" Order marked as paid,",orderId })
} catch (error){
    res.status(500).json({message : "Webhook failed"})
}

}


 module.exports = {
    startPayment,
    handleWebhook,

 }