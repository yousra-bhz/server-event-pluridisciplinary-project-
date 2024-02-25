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
const posts = require('../controllers/getAllposts')
const getPost = require('../controllers/getPost')
const Feed = require('../controllers/feedUser')
const userPosts = require('../controllers/getUserPosts')
const Approuve = require('../controllers/approuveEventByAdmin')
const deletEvent = require('../controllers/deleteEvent')
const AddPhoneNumber = require('../controllers/addPhoneNumber')
const WaitingPost = require('../controllers/waitingPostsAdmin')
const LikeEvent = require('../controllers/likeEvent');
const DisLikeEvent = require('../controllers/dislikeEvent')
const FollowUser = require('../controllers/follow')
const LikedEvents = require('../controllers/showLikedEvents')
const Follows = require('../controllers/showFollows')
const Followers = require('../controllers/showFollowers')
const Unfollow = require('../controllers/unfollow')
const FeedBack = require('../controllers/feedback')
const Clear = require('../controllers/clearNotif')
const RefuseEventByAdmin = require('../controllers/refuseEvent')

//IMPORTING CONTROLLERS
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
router.route('/addPost').post(Auth ,posting ) 
router.route('/AddYourPhoneNumber').post(Auth,AddPhoneNumber)
router.route('/AddFeedBack').post(Auth , FeedBack)



//GET METHODS
router.route('/users/:id').get(getUser)
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
router.route('/waitingPosts').get(Auth , WaitingPost)
router.route('/likedEvents').get(Auth , LikedEvents)
router.route('/yourFollows').get(Auth , Follows)
router.route('/yourFollowers').get(Auth , Followers)



//PUT METHODS
//router.route('/updateUser').put(updateUser)
router.route('/resetPassword').put( verifyUser ,resetPassword)
router.route('/approuveEvent/:id').put(Approuve)
router.route('/likeEvent/:id').put( Auth , LikeEvent)
router.route('DislikeEvent/:id').put(Auth ,DisLikeEvent)
router.route('/followuser/:id').put( Auth , FollowUser)
router.route('/unfollowuser/:id').put(Auth , Unfollow)
router.route('/clearNotif').put(Auth , Clear)

//DELETE METHODS
router.route('/deletEvent/:id').delete(Auth , deletEvent)
router.route('/refuseEvent/:id').delete(RefuseEventByAdmin)

module.exports = router;