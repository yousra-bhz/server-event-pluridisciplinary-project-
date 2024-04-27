const User = require('../models/user')


const VerifyOTP  = async( req , res ) => {
        const {OTPcode} = req.body;
        const {_id} = req.user;
        const user = await User.findById(_id);

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