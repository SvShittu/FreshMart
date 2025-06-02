const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const { register, login, logout, handleUserRegistration, handleLogin, handleForgetPassword, handleLogout, handleResetPassword, } = require("../controllers/authCtrl")

const router = express.Router()

router.post("/register", handleUserRegistration)
router.post("/login", handleLogin)
router.post("/forget-password", handleForgetPassword)
router.post("/reset-password", handleResetPassword )
router.get("/logout", handleLogout)

module.exports = router
