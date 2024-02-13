const User = require('../models/user')

const AddPhoneNumber = (req , res) => {
        const {phoneNumber} = req.body
        const {userId} = req.user
        User.findOne({userId}).then((foundUser) => {
            if(!foundUser){
                res.status(401).send("user not found")
            }
            else{
                foundUser.phoneNumber = phoneNumber
                foundUser.save().then(() => {
                    res.status(200).send('phone number added succesfully');
                    console.log(foundUser)
                }
                    )
                .catch((err) => res.status(501).send('we could not save the changes'))
            }
        })
        .catch(err => console.log(err))
}

module.exports = AddPhoneNumber