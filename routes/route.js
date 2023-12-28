const express = require('express')
const router = express.Router();
//import all controllers
const register = require('../controllers/register');
const login = require('../controllers/login');
const getUser = require('../controllers/getUser');
const updateUser = require('../controllers/updateUser');
const generateOTP = require('../controllers/generateOTP');
const verifyOTP = require('../controllers/verifyOTP');
const createResetSession = require('../controllers/createResetSession');
const resetPassword = require('../controllers/resetPassword');
const Mailer = require('../controllers/mailer');
const verifyUser = require('../middleware/verifyUser')
//const Auth = require('../middleware/auth')
const Locals = require('../middleware/locals')


//POST ROUTES
router.route('/register').post(register)
router.route('/registerMail').post(Mailer)
router.route('/euthenticate').post((req , res) => {
    res.end()
})
router.route('/login').post(login)

//GET METHODS
router.route('/users/:username').get(getUser)
router.route('/generateOTP').get(verifyUser ,Locals, generateOTP)
router.route('/verifyOTP').get( verifyUser ,verifyOTP)
router.route('/createResetSession').get(createResetSession)

//PUT METHODS
//router.route('/updateUser').put(updateUser)
router.route('/resetPassword').put( verifyUser ,resetPassword)

module.exports = router;