const express = require(`express`)
const router = require(`./pages`)
const register = require(`../controller/register`)
//const router = express.Router()
const login = require(`../controller/login`)


router.post(`/register`, register.register)
router.post(`/login`, login.login)


module.exports = router