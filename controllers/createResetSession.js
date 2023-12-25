const createResetSession = async(req , res) =>{
    if(req.app.locals.nextSession === true){
        req.app.locals.nextSession= false;
        return res.status(201).send({message : "session was reset suucesfully"})
    }
}

module.exports = createResetSession