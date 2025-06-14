 const axios = require("axios")
 const { intializePayment, verifyPayment } = require("../utils/payStack")
 const Order = require("../models/orderModel")

 const startPayment = async(req, res) => {
try {
    const { email, amount, orderId} = req.body
    const payment = await intializePayment ({
        email,
        amount,
        userId: req.user._id,
        orderId
    })
    res.json({url : payment.authorization_url})
} catch (error) {
    console.error("Payment error || error.message")

res.status(500).json({message: " Payment initialization failed"})
 }
 }
const handleWebhook = async(req, res) =>  {
try{
    const event = req.body
    if(event.event === "charge.success"){
        const { orderId } = event.data
        const order = await Order.findById(orderId)
        if(order && !order.isPaid){
            order.isPaid = true
            order.paidAt = new Date()
            order.paymentInfo = {
                reference: event.data.reference,
                channel: event.data.channel,
                amount: event.data.amount / 100

            }
            await order.save()
            
        }
    }
   res.status(200).json({message:" Order marked as paid,",orderId })
} catch (error){
    res.status(500).json({message : error.message})
}

}


 module.exports = {
    startPayment,
    handleWebhook,

 }