const Review = require('../models/reviewModel');

const createReview = async (req, res) => {
    try {
        const { title, description, view, businessID } = req.body;
        const userID = req.user.id; // Assuming you have user authentication middleware

        // Additional checks if needed
        if (!title || !description || !view || !businessID) {
            return res.status(400).json({ error: 'Title, description, view, and businessID are required' });
        }

        const newReview = await Review.create({
            title,
            description,
            view,
            businessID,
            userID,
        });

        res.json(newReview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Other review-related functions (e.g., getReviews, editReview, deleteReview) can be added here

module.exports = {
    createReview,
    // Add other functions as needed
};
