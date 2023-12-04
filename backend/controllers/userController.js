const User = require('../models/user');
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
        //check password
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters'
            })
        }
        //check email
        const exist = await User.findOne({email})
        if(exist){
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

// Login Endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            res.json({error: 'Error no user found'})
        }

        // check if passwords match
        const match = await comparePassword(password, user.password)
        
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
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
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user);
        })
    }
    else{
        res.json(null);
    }
}

const editProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id; // Extract user id from the authenticated token

        // Additional checks if needed
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        // Update user in the database
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user id from the authenticated token

        // Delete user from the database
        await User.findByIdAndDelete(userId);

        // Optionally, you might want to clear the user's session or perform additional cleanup

        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    editProfile,
    deleteProfile
}