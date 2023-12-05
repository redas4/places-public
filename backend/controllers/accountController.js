const User = require('../models/user');
const Business = require('../models/business')
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const getProfile = (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user);
        })
    }
    else{
        res.json(null);
    }
}

// Login Endpoint
const loginAccount = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if it's a user login
      const user = await User.findOne({ email });
      if (user) {
        const match = await comparePassword(password, user.password);
        if (match) {
          const token = jwt.sign({ email: user.email, id: user._id, type: 'user' }, process.env.JWT_SECRET);
          return res.cookie('token', token).json({ user, type: 'user' });
        }
      }
  
      // Check if it's a business login
      const business = await Business.findOne({ email });
      if (business) {
        const match = await comparePassword(password, business.password);
        if (match) {
          const token = jwt.sign({ email: business.email, id: business._id, type: 'business' }, process.env.JWT_SECRET);
          return res.cookie('token', token).json({ business, type: 'business' });
        }
      }
  
      res.json({ error: 'Invalid email or password' });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  module.exports = {
    loginAccount,
    getProfile,
  }