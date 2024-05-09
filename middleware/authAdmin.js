const Admin = require('../models/user')
const jwt = require('jsonwebtoken')
const JWTsecret = "NQ2VDian0W9dx0OSHSXQpIGgBA1uf6KYKlYajidiKBs=";


const AuthAdmin  = async(req , res , next) => {
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
    return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWTsecret,(err,payload)=>{
        if(err){  
        res.status(401).json({error:"you should be logged in"})
        }
        console.log('payload');
        console.log(payload);
        const {userId} = payload
        Admin.findById(userId).then(userdata=>{
            req.user = userdata;
            res.status(200).end('yes you are an admin')
            next()
        })
        
        
    })

}

module.exports = AuthAdmin