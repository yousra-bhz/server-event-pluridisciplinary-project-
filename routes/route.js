import {Router} from 'express';
const router = Router();
//import all controllers
import * as controller from '../controllers/appController'


//POST ROUTES
router.route('/register').post(controller.register)
// router.route('/registerMail').post((req , res) => { 
// })//send the mail
router.route('/euthenticate').post((req , res) => {
    res.end()
})
router.route('/login').post(controller.login)

//GET METHODS
router.route('/users/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)

//PUT METHODS
router.route('/updateUser').put(controller.updateUser)
router.route('/resetPassword').put(controller.resetPassword)