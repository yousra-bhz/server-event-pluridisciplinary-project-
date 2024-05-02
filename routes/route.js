const express = require('express')
const router = express.Router();


//import all controllers
const register = require('../controllers/register');
const login = require('../controllers/login');
const getUser = require('../controllers/getUser');
const UpdateEvent = require('../controllers/updateEvent');
const generateOTP = require('../controllers/generateOTP');
const VerifyOTP = require('../controllers/VerifyOTP');
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
const Interested = require('../controllers/interested')
const UpdateUser = require('../controllers/updateUser')
const CancelEvent = require('../controllers/cancelEvent')
const RepportEvent = require('../controllers/reportEvent')
const WarnUser = require('../controllers/warnUser')
const RandomPosts = require('../controllers/getRandomEvents')
const DeleteEventByAdminReport = require('../controllers/deleteEventByAdmin(report)')


//IMPORTING CONTROLLERS
const Auth = require('../middleware/auth')




//POST ROUTES
router.route('/register').post(register)
router.route('/registerMail').post(Mailer)
router.route('/login').post(login);
router.route('/addPost').post(Auth ,posting ) 
router.route('/AddYourPhoneNumber').post(Auth,AddPhoneNumber)
router.route('/AddFeedBack/:id').post(Auth , FeedBack)
router.route('/ReportEvent/:id').post(Auth , RepportEvent)
router.route('/generateOTP').post( generateOTP)
router.route('/verifyOTP').post(VerifyOTP)




//GET METHODS
router.route('/users/:id').get(getUser)

router.route('/createResetSession').get(createResetSession)
router.route('/gettingusers').get(users)
router.route('/gettingposts').get(posts)
router.route('/feed').get(Auth , Feed)
router.route('/posts/:postId').get(getPost)
router.route('/yourPosts').get(Auth, userPosts)
router.route('/waitingPosts').get(WaitingPost)
router.route('/likedEvents').get(Auth , LikedEvents)
router.route('/yourFollows').get(Auth , Follows)
router.route('/yourFollowers').get(Auth , Followers)
router.route('/Home').get(RandomPosts)




//PUT METHODS
//router.route('/updateUser').put(updateUser)
router.route('/resetPassword').put(resetPassword)
router.route('/approuveEvent/:id').put(Approuve)
router.route('/likeEvent/:id').put( Auth , LikeEvent)
router.route('dislike/:id').put(Auth , DisLikeEvent)
router.route('/followuser/:id').put( Auth , FollowUser)
router.route('/unfollowuser/:id').put(Auth , Unfollow)
router.route('/clearNotif').put(Auth , Clear)
router.route('/Interested/:id').put(Auth , Interested)
router.route('/UpdateEvent/:id').put(Auth , UpdateEvent)
router.route('/UpdateYourInfos').put(Auth , UpdateUser)
router.route('/CancelEvent/:id').put(Auth , CancelEvent)
router.route('/WarnUser/:id').put(WarnUser)

//DELETE METHODS
router.route('/deletEvent/:id').delete(Auth , deletEvent)
router.route('/refuseEvent/:id').delete(RefuseEventByAdmin)
router.route('/deleteReportedEvent/:id').delete(DeleteEventByAdminReport)

module.exports = router;