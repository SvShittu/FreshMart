const axios = require("axios")

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const headers = {
  Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  "Content-Type": "application/json",
}

const initializePayment = async({email, amount, userId, orderId })=> {
   try{ const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
    {
      email,
      amount: amount * 100,
      metadata: {
        userId,
        orderId,
      },
      callback_url: `${process.env.BASE_URL}/payment/verify`
    },
    {headers}
    
    )
    return response.data.data

} catch(error){
res.status(500).json({message: "Failed to initialize payment" })
}
}
const verifyPayment = async(reference)=> {
  try {
    const res = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`,
       {headers}
      )
  return res.data.data

  } catch (error) {
    res.status(500).json({message: "Paystack Verification Error"})
  
  }
}
module.exports = {initializePayment, verifyPayment}

