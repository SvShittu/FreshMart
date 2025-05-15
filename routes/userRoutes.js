const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const { register, login } = require("../controllers/userCtrl")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)

module.exports = router