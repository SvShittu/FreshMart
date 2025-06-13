const axios = require("axios")

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const headers = {
  Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  "Content-Type": "application/json",
}

const initializePayment = async({email, amount})=> {
    const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
    {
      email,
      amount: amount * 100,
      callback_url: `${process.env.BASE_URL}/payment/verify`
    },
    {headers}
    
    )
    return res.data.data

}

const verifyPayment = async(reference)=> {
  const res = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, { headers })
return res.data.data
}

module.exports = {initializePayment, verifyPayment}

