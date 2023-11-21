import './app.mjs';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:/places');

const User = new mongoose.Schema({
    userID: Number,
    username: String,
    email: String,
    passwordHash: String,
    reviews: Array, // array of the reviews they have written
    friends: Array // array of other userID's
});
mongoose.model('User', User);

const Review = new mongoose.Schema({
    reviewID: Number,
    userID: Number, // to identify who wrote the review
    businessID: Number,
    rating: Number,
    text: String,
    privacy: String 
});
mongoose.model('Review', Review);

const Business = new mongoose.Schema({
    businessID: Number,
    name: String,
    description: String,
    email: String,
    passwordHash: String,
    reviews: Array, // array of the reviews that have been written about them
    location: String // a saved location on the map
});
mongoose.model('Business', Business);