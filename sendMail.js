const nodemailer = require("nodemailer")

const sendForgotPasswordEmail = async(email, token) => {
    try {
        const mailTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }     
       })

      const resetLink = `https://www.yourcareerex.com/reset-password/${token}`
       const mailDetails = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password Notification",
        html:`
        <h2>Reset Your Password</h2>
        <p>You requested to reset your password. Click the button below to proceed</p>
        <p>
        <a href = "${resetLink}" style = "display:inline-block; padding: 10px 20px; background-color:#007bff;color:#fff;text-decoration:none;border-radius:5px;">Reset Password</a>
        </p>
        <p>If the button doesn't work, make use of this link by copying and pasting in your browser</p>
        p><a href="${resetLink}">${resetLink}</a></p>
        <p>Token (for reference): <strong>${token}</strong></p>
        <p>If you didn't request this, you can ignore this email.</p>

        `
         } 
    await mailTransport.sendMail(mailDetails)
    console.log(`Reset email sent to ${email}`)
     }catch (error) {
        console.log("Error sending reset email", error)
        
     }
    }


    const validEmail = (email)=>{
        const re =
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) 
    }

    module.exports = {
        sendForgotPasswordEmail,
        validEmail
    }