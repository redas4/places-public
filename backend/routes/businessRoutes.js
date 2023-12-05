const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerBusiness, getBusinessProfile, editBusinessProfile, reviewsAboutMe, getAllBusinesses, getBusinessProfileByID, getBusinessReviews } = require('../controllers/businessController');


router.get('/', test)

router.post('/register-business', registerBusiness)
router.post('/profile', getBusinessProfile);
router.put('/edit-profile', editBusinessProfile);
router.get('/reviews-about-me', reviewsAboutMe );

router.get('/businesses', getAllBusinesses)
router.get('/profile/:businessId', getBusinessProfileByID )
router.get('/profile/:businessId/reviews', getBusinessReviews)
module.exports = router;