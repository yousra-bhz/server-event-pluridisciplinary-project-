const jwt = require('jsonwebtoken');
const JWTsecret = "NQ2VDian0W9dx0OSHSXQpIGgBA1uf6KYKlYajidiKBs=";
const Auth = async(req , res , next) =>{
        try{
         const token = req.headers.authorization;
         //retrieve the user header details for the logged in user
         //the verify methos is goign to return the decoded token
         const decodedtoken = await jwt.verify(token ,JWTsecret);
         req.user = decodedtoken;
         next()
        }
        catch(error) {
            res.status(401).send({error : "Authentication failed"})
        }
}



module.exports = Auth