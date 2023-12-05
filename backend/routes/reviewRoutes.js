const express = require('express');
const router = express.Router();
const cors = require('cors');
const { addReview } = require('../controllers/reviewController');


router.post('/addReview', addReview);


module.exports = router;
