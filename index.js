const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./db")
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
dotenv.config()
connectDB()
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})


app.use("/api/users", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/categories", categoryRoutes)

// app.use((req, res, next) =>{
//     res.status(404).json({message: "Route not found"})
// } )