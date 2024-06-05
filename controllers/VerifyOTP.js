const User = require('../models/user')


const VerifyOTP  = async( req , res ) => {
        const {OTPcode} = req.body;
        const email = req.app.locals.email ;
        const user = await User.findOne(email);

        if (user && user.OTPcode === OTPcode){
            user.OTPcode = null;
            user.OTPverfied = true;
            user.save()
            res.status(200).send('OTPcode verified succesfully')
        }
        else{
            res.status(400).send({error : "invalid verification"})
        }
}

module.exports = VerifyOTP