const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerBusiness, getProfile, loginBusiness } = require('../controllers/businessController')


router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173', 'https://places-public.vercel.app', 'http://72.231.28.64:5173']
    })
)

router.get('/', test)

router.post('/register-business', registerBusiness)
router.post('/login-business', loginBusiness)
router.get('/business-profile', getProfile)

module.exports = router;