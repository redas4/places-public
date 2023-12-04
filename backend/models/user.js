const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});


const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
