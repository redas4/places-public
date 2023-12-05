const Business = require('../models/business');
const Review = require('../models/review')
const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');


const test = (req, res) => {
    res.json('test is working')
}

// Register endpoint
const registerBusiness = async (req, res) => {
    try {
        const {name, email, password, description} = req.body;

        //check name
        if(!name){
            return res.json({
                error: 'Name is required'
            })
        }
        if(!email){
            return res.json({
                error: 'Email is required'
            })
        }
        //check password
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters'
            })
        }
        //check email
        const existingBusiness = await Business.findOne({email})
        const existingUser = await User.findOne({email})
        if(existingBusiness || existingUser){
            return res.json({
                error: 'Email is already taken'
            })
        }

        const hashedPassword = await hashPassword(password);
        // create business in database
        const business = await Business.create({
            name, 
            email, 
            password: hashedPassword,
            description
        })
        return res.json(business)

    } catch (error) {
        console.log(error);
    }

}

// Login Endpoint
const loginBusiness = async (req, res) => {
    try {
        const {email, password} = req.body;
        const business = await Business.findOne({email})
        if(!business){
            res.json({error: 'Error no business found'})
        }

        const match = await comparePassword(password, business.password)
        if(match){
            jwt.sign({email: business.email, id: business._id, name: business.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(business)
            })
        }
        if(!match){
            res.json({
                error: 'Passwords do not match'
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, business) => {
            if(err) throw err;
            res.json(business);
        })
    }
    else{
        res.json(null);
    }
}

const getBusinessProfile = async (req, res) => {
    try {
         console.log('Biz is being hit  ');
        const accountId = req.body.accountId;
        const business = await Business.findOne({ _id: accountId });
        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }

        res.json(business);
    } catch (error) {
        console.error('Get business profile error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
const editBusinessProfile = async (req, res) => {
    try {
        const { name, email, description } = req.body;
        const business = await Business.findByIdAndUpdate(req.body._id, { name, email, description }, { new: true });
        res.json(business);
    } catch (error) {
        console.error('Update business profile error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const reviewsAboutMe = async (req, res) => {
    try {
        const businessId = req.body.accountId;
        const publicReviews = await Review.find({
            businessID: businessId,
            view: 'public'
        });

        res.status(200).json(publicReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.status(200).json(businesses);
    } catch (error) {
        console.error('Error retrieving businesses:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getBusinessProfileByID = async (req, res) => {
    try {
        const businessId = req.params.businessId; 
        const business = await Business.findById(businessId);
        
        if (!business) {
        return res.status(404).json({ error: 'User not found' });
        }
        res.json(business);
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const getBusinessReviews = async (req, res) => {
    try{ 
        const businessId = req.params.businessId; 
        const publicReviews = await Review.find({
            businessID: businessId,
            view: 'public'
        });

        res.status(200).json(publicReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    test,
    registerBusiness,
    loginBusiness,
    getProfile,
    getBusinessProfile,
    editBusinessProfile,
    reviewsAboutMe,
    getAllBusinesses,
    getBusinessProfileByID,
    getBusinessReviews
}