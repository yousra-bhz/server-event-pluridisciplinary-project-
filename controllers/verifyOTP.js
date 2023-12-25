const verifyOTP = async(req , res) =>{
    const {code} = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null,
        req.app.locals.nextSession = true;
        res.status(201).send({message: "verified succesfully"})
    }
    else{
        res.status(400).sned({error : "invalid verification"})
    }
}

module.exports = verifyOTP