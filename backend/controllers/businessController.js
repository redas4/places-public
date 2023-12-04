const Business = require('../models/business');
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
        //check password
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters'
            })
        }
        //check email
        const exist = await Business.findOne({email})
        if(exist){
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

        // check if business exists
        const business = await Business.findOne({email})
        if(!business){
            res.json({error: 'Error no business found'})
        }

        // check if passwords match
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

module.exports = {
    test,
    registerBusiness,
    loginBusiness,
    getProfile
}