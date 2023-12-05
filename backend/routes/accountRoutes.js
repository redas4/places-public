const express = require('express');
const router = express.Router();
const cors = require('cors');
const { loginAccount, getProfile } = require('../controllers/accountController');

router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173', 'https://places-public.vercel.app', 'http://72.231.28.64:5173']
    })
);

// router.get('/', test);

// router.post('/register-user', registerUser);
router.post('/login', loginAccount);
router.get('/profile', getProfile);
// router.put('/edit-profile',  editProfile);
// router.delete('/delete-profile', deleteProfile);

module.exports = router;