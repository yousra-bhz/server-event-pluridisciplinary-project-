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
const posting = require('../controllers/addPost')
const users = require('../controllers/users')
const posts = require('../controllers/posts')
const getPost = require('../controllers/getPost')
const Feed = require('../controllers/feedUser')
const userPosts = require('../controllers/getUserPosts')
const Approuve = require('../controllers/approuveEventByAdmin')
const verifyUser = require('../middleware/verifyUser')
const Auth = require('../middleware/auth')
const Locals = require('../middleware/locals')



//POST ROUTES
router.route('/register').post(register)
router.route('/registerMail').post(Mailer)
router.route('/euthenticate').post((req , res) => {
    res.end()
})
router.route('/login').post(login);
router.route('/addPost').post(Auth ,posting)

//GET METHODS
router.route('/users/:username').get(getUser)
router.route('/generateOTP').get(verifyUser ,Locals, generateOTP)
router.route('/verifyOTP').get( verifyUser ,verifyOTP)
router.route('/createResetSession').get(createResetSession)
router.route('/gettingusers').get(users)
router.route('/gettingposts').get(posts)
router.route('/protected').get(Auth ,(req,res) => {
    res.json(req.user)
})
router.route('/feed').get(Auth , Feed)
router.route('/posts/:postId').get(getPost)
router.route('/yourPosts').get(Auth, userPosts)
//PUT METHODS
//router.route('/updateUser').put(updateUser)
router.route('/resetPassword').put( verifyUser ,resetPassword)
router.route('/approuveEvent/:id').put(Approuve)

module.exports = router;