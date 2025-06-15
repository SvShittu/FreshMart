const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./db")
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const limiter = require("./middleware/rateLimiter")
dotenv.config()
connectDB()
const app = express()
const path = require("path")
app.use(express.json())

const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

app.use(limiter)
app.get('/', (req, res) => {

  res.send('Welcome to my freshmart backend API!')

})
app.use("/api/users", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/payment", paymentRoutes)

app.use('/docs', express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" })
})