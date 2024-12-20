const db = require(`../config/db`)
const express = require(`express`)
const { search } = require(`../route/pages`)
const router = express.Router()

exports.viewclient = (req, res)=>{
    db.query(`select client_id, name, surname, email`, (err, rows)=>{
        if(err){
            console.log(err);
        } else {
            res.status(200).render(`viewclient`, {rows})
        }
    })
}

exports.findclient = (req, res)=>{
    const find = req.body.find

    db.query(`select * from clients where name Like ? or surname Like ? or email Like ?`, ['%'+ find + '%', '%'+ find + '%', '%'+ find + '%'], (err, rows)=>{
        if(err){
            console.log(err);
        } else {
            res.status(200).render(`viewclient`, {rows})
        }
    })
}

exports.editclient = (req, req) =>{
    db.query(`select * from clients where client_id = ?`, [req.params.id], (err,rows)=>{
        if(err){
            console.log(err);
      
        } else {
            res.render(`editclient`, {rows})
        } 
    })
}
exports.update = (req, res)=>{
    const {name, surname} = req.body

    db.query(`update client set name = ?, surname = ?`, [name, surname, req.params.id], (err, result)=>{

        if(err){
            console.log(err);
            return res.redirect(`/`)
            
        } else {
            db.query(`select client_id, name, surname from clients`, (err, rows)=>{
                if(err){
                    console.log(err);
                    
                } else {
                    res.status(200).render(`viewclient`, {rows})
                }
            })
        }
    })
}