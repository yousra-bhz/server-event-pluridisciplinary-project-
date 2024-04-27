const VerifyOTP  = ( req , res , next) => {
        const {OTPcode} = req.body;

        if (req.app.locals.OTP === OTPcode){
            req.app.locals.OTP = null
        }
        else{
            res.status(400).send({error : "invalid verification"})
        }
}