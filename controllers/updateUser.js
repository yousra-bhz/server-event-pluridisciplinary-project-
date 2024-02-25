const User = require('../models/user');

const updateUser = async (req, res)=>{
    try{
        const {_id} = req.user;
        const {
                newUsername ,
                newPhoneNumber ,
                newEmail ,
                newDescription} = req.body

        await User.findByIdAndUpdate(_id,
            {username:newUsername ,
            phonenumber:newPhoneNumber ,
            email:newEmail ,
            description:newDescription})

        console.log('Profile updated successfully:', newUsername);
        res.status(200).send('Profile updated successfully!');
            }

        catch(error) {
                console.error('Error updating profile:', error);
                res.status(500).send('Error updating profile');
             
        }


}
module.exports = updateUser

