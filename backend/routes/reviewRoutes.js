const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createReview } = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173', 'https://places-public.vercel.app', 'http://72.231.28.64:5173']
    })
);

router.post('/create-review', authenticateToken, createReview);
// Add other review-related routes as needed

module.exports = router;
