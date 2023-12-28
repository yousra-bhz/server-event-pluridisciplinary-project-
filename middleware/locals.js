const Locals = (req , res , next) => {
    req.app.locals ={
        OTP : null,
        nextSession : false
    }
    next ()
}

module.exports = Locals