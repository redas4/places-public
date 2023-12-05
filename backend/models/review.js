const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    title: String,
    description: String,
    view: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
    businessID: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
