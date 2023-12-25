const jwt = require('jsonwebtoken');
const ENV= require('../config')
const Auth = async(req , res , next) =>{
        try{
         const token = req.headers.authorization.split("  ")[1];
         //retrieve the user header details for the logged in user
         //the verify methos is goign to return the decoded token
         const decodedtoken = await jwt.verify(token , ENV.JWT_SECRET);
         req.user = decodedtoken;
         next()
        }
        catch(error) {
            res.status(401).send({error : "Authentication failed"})
        }
}



module.exports = Auth