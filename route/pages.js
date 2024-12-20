const express = require(`express`)
const router = express.Router();
const cookieParser = require(`cookie-parser`);
const { isAuthenticated } = require("../middleware/auth");

router.get(`/register`, (req, res) =>{
    res.render(`register`)
})
router.get(`/login`, (req, res)=>{
    res.render(`login`)
})

router.get(`/registeragent`, (req, res)=>{
    res.render(`registeragent`)
})

router.get(`/dashboard`, isAuthenticated, (req, res) =>{
    res.render(`dashboard`)
})

router.get(`/policies`, (req, res)=>{
    res.render(`policies`)
})
router.get(`/logout`, (req, res)=>{
    res.clearCookie(`clientRegister`)
    res.redirect(`/login`)
})




module.exports = router