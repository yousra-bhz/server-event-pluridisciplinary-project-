const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const JWTsecret = "NQ2VDian0W9dx0OSHSXQpIGgBA1uf6KYKlYajidiKBs="


const AuthAdmin  = () => {
        const {authorization} = req.headers

        if(!authorization){
            res.status(401).json({error:"you must be logged in"})
        }

        const token = authorization.replace("Bearer" , "")
        jwt.verify(token , JWTsecret , (err , payload) => {
            if(err){
                console.log(err)
            }
            console.log(payload)
            const {id} = payload


            Admin.findById(id).then((admindata) =>{
                req.admin = admindata;
                next()
            })
        })
}

module.exports = AuthAdmin