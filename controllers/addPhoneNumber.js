const User = require('../models/user')

//WORKING

const AddPhoneNumber = (req , res) => {
        const {phoneNumber} = req.body
        const {_id} = req.user

        User.findOne({phoneNumber : phoneNumber}).then((user) => {
            if(user){
            res.status(501).send('this phone number exists already please tru with an another phone number')
            }
            else {

                User.findById(_id).then((foundUser) => {
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
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('an error occured when searching the phone number')
        })
        
}

module.exports = AddPhoneNumber