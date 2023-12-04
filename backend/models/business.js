const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    description: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});


const BusinessModel = mongoose.model('Business', businessSchema);
module.exports = BusinessModel;