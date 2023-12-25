const otpGenerator = require('otp-generator')

const generateOTP = async(req , res) =>{
  req.app.locals.OTP =  await otpGenerator.generate(6 , {lowerCaseAlphabets :false , upperCaseAlphabets : false , specialChars : false} );
  res.status(201).send({ code : req.app.locals.OTP })
}

module.exports = generateOTP