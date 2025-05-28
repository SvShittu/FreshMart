const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const { register, login, logout, } = require("../controllers/authCtrl")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/forget-password", )
router.get("/logout", logout)

module.exports = router
