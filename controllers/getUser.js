const User = require('../models/user')
//WORKING
const getUser = async(req , res) =>{
    const {id} = req.params 
    try{
    if(!id){
        return res.status(501).send({error : "invalid user name"})
    }
    else{
        User.findById(id).then((userExist) =>{
            if(userExist){
                const {password, ...rest } = Object.assign({} , userExist.toJSON())
                return res.status(201).send(rest)
            }
        else {
            return res.status(501).send({error : 'username does no exist in the database' })
        }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    }
    catch(error){
    return res.status(404).send({error : "cannor find user"})
    }
}

module.exports = getUser