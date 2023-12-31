const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, getProfile, editProfile, deleteProfile, getMyReviews, getMyFriends, getAllUsers, getUserProfile, getUserReviews } = require('../controllers/userController');


router.get('/', test);

router.post('/register-user', registerUser);
router.post('/profile', getProfile);
router.put('/edit-profile',  editProfile);
router.delete('/delete-profile', deleteProfile);
// router.get('my-reviews', getMyReviews)
router.get('my-freinds', getMyFriends)
router.get('/users', getAllUsers)

router.get('/profile/:userId', getUserProfile);
router.get('/profile/:userId/reviews', getUserReviews)
router.post('/my-reviews', getMyReviews)

module.exports = router;
