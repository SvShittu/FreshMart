const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const categoryRoutes = require("./routes/categoryRoutes")

connectDB()
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})


app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/categories", categoryRoutes)
