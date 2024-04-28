const User = require('../models/user')

const SetPreferences = async(req , res) => {
    try{
        const {_id} = req.user;
        const {preOne , preTwo , preThree , preFour , preFive , preSix} = req.body;
        const user = await User.findById(_id);
        if(user){
                user.preOne = preOne;
                user.preTwo = preTwo;
                user.preThree = preThree;
                user.preFour = preFour;
                user.preFive = preFive;
                user.preSix = preSix;
                user.save();
                res.status(200).send('preferences are set succesfully')
                return
        }
        else {
            res.status(401).send('user not found')
            return
        }
    }
       catch(error) {
        console.log(error)
        res.json('an error is occured')
       }
}

module.exports = SetPreferences