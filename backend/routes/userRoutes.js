const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, editProfile, deleteProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173', 'https://places-public.vercel.app', 'http://72.231.28.64:5173']
    })
);

router.get('/', test);

router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.get('/user-profile', authenticateToken, getProfile);
router.put('/edit-profile', authenticateToken, editProfile);
router.delete('/delete-profile', authenticateToken, deleteProfile);

module.exports = router;
