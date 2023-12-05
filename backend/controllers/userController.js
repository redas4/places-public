const User = require('../models/user');
const Business = require('../models/business')
const Review = require('../models/review')
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');


const test = (req, res) => {
    res.json('test is working')
}

// Register endpoint
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
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
        // create user in database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        })
        return res.json(user)

    } catch (error) {
        console.log(error);
    }

}

  

const getProfile = async (req, res) => {
    try {
        const accountId = req.body.accountId;
        const user = await User.findOne({ _id: accountId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get business profile error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const editProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.body.id, { name, email }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, '_id name');
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        await User.findByIdAndDelete(userId);
        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserProfile = async (req, res) => {
    try {
      const userId = req.params.userId; 
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Get user profile error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getUserReviews = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('User id from params', userId);

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.populate({ path: 'reviews', model: 'Review', populate: { path: 'businessID', model: 'Business' } });

        const publicReviews = user.reviews.filter(review => review.view === 'public');
        const responseReviews = publicReviews.map(review => ({
            title: review.title,
            description: review.description,
            businessName: review.businessID.name, 
            date: review.date,
        }));

        res.status(200).json(responseReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getMyReviews = async (req, res) => {
    try {
        const userId = req.body.accountId;
        console.log('Here is my id:   ', userId)

        const myReviews = await Review.find({ userID: userId })
            .populate({
                path: 'businessID',
                select: 'name', 
            })
            .exec();
        console.log('Here are my reviews:   ', myReviews)
        res.status(200).json(myReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const getMyFriends = async (req, res) => {

}



module.exports = {
    test,
    registerUser,
    getProfile,
    editProfile,
    deleteProfile, 
    getMyReviews,
    getMyFriends,
    getAllUsers,
    getUserProfile,
    getUserReviews
}