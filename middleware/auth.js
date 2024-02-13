const jwt = require('jsonwebtoken')
const JWTsecret = "NQ2VDian0W9dx0OSHSXQpIGgBA1uf6KYKlYajidiKBs=";
const mongoose = require('mongoose')
const User = mongoose.model("User")



const Auth = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWTsecret,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you should be logged in"})
        }
        const {userId} = payload
        console.log(payload)
        User.findById(userId).then(userdata=>{
            console.log(userdata)
            req.user = userdata
            next()
        })
        
        
    })
}

module.exports = Auth