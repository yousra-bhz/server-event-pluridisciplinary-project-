const User = require('../models/user');

const UpdateUser = async() => {
            const {_id} = req.user
            const {email , username , phoneNumber} = req.body

             User.findByIdAndUpdate(_id , {
                email , 
                username,
                phoneNumber
            }).then(() => {
                res.status(200).send('your infos are updated succesfully')
            })
            .catch((err) => {
                console.log(err)
                res.status(501).send('we could not update your infos')
            })
            
}

module.exports = UpdateUser