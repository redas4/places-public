const express = require('express');
const router = express.Router();
const cors = require('cors');
const { loginAccount, getProfile } = require('../controllers/accountController');


// router.get('/', test);

// router.post('/register-user', registerUser);
router.post('/login', loginAccount);
router.get('/profile', getProfile);
// router.put('/edit-profile',  editProfile);
// router.delete('/delete-profile', deleteProfile);

module.exports = router;