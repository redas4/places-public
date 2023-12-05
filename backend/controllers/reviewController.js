const Review = require('../models/review');

const addReview = async (req, res) => {
    try {
        const { title, description, visibility, businessId, accountId  } = req.body;
        if (!title || !description || !visibility || !businessId) {
            return res.status(400).json({ error: 'Title, description, view, and businessID are required' });
        }

        const newReview = await Review.create({
            title,
            description,
            view: visibility,
            businessID: businessId,
            userID: accountId,
        });

        res.json(newReview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    addReview,
    // Add other functions as needed
};
