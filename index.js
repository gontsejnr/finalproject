//import packages to be used
const express = require(`express`)
const db = require(`./config/db`);
const cookieParser = require("cookie-parser");
const router = require(`./route/pages`)
const path = require(`path`)


const app = express();
const port = process.env.PORT || 3301

app.get(``, (req, res) =>{
    res.render(`home`)
})

app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(`/`, require(`./route/pages`))
app.use(`/auth`, require(`./route/auth`))

app.use(express.static(`./public`))
app.use(express.static(`./public/images`))

app.set(`view engine`, `hbs`)

app.listen(port, ()=>{
    console.log(`Running on ${port}`);
})