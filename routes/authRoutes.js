const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/authModel")
const {handleUserRegistration, handleLogin, handleForgetPassword, handleLogout, handleResetPassword, } = require("../controllers/authCtrl")
const { validateRegistration, validateLogin } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/register",validateRegistration, handleUserRegistration)
router.post("/login",validateLogin, handleLogin)
router.post("/forget-password", handleForgetPassword)
router.post("/reset-password", handleResetPassword )
router.get("/logout", handleLogout)

module.exports = router
