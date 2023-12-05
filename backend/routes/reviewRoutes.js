const express = require('express');
const router = express.Router();
const cors = require('cors');
const { addReview } = require('../controllers/reviewController');

router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173', 'https://places-public.vercel.app', 'http://72.231.28.64:5173']
    })
);

router.post('/addReview', addReview);


module.exports = router;
