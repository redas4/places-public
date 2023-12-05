import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';


const BusinessProfile = () => {
  const { account } = useContext(UserContext);
  const { businessId } = useParams();
  const [businessDetails, setBusinessDetails] = useState({});
  const [businessReviews, setBusinessReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [reviewVisibility, setReviewVisibility] = useState('public');

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const handleCancel = () => {
    toggleReviewForm();
    setReviewTitle('');
    setReviewDescription('');
    setReviewVisibility('public');
  };

  const handleSubmit = async () => {
    if (!reviewTitle || !reviewDescription) {
      toast.error('Please fill out all fields of the review');
      return;
    }

    try {
      await axios.post(`/reviews/addReview`, {
        title: reviewTitle,
        description: reviewDescription,
        visibility: reviewVisibility,
        accountId: account.id,
        businessId: businessId
      });
      const response = await axios.get(`/businesses/profile/${businessId}/reviews`);
      const reviews = response.data;
      setBusinessReviews(reviews);
      toggleReviewForm();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Error submitting review. Please try again.');
    }
  };

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await axios.get(`/businesses/profile/${businessId}`);
        const details = response.data;
        setBusinessDetails(details);
      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    };

    const fetchBusinessReviews = async () => {
      try {
        const response = await axios.get(`/businesses/profile/${businessId}/reviews`);
        const reviews = response.data;
        setBusinessReviews(reviews);
      } catch (error) {
        console.error('Error fetching business reviews:', error);
      }
    };

    fetchBusinessDetails();
    fetchBusinessReviews();
  }, [businessId]);

  return (
    <div>
      <h1>Business Profile</h1>
      <h2>{businessDetails.name}</h2>
      <p>About: {businessDetails.description}</p>

      <button onClick={toggleReviewForm}>Add Review</button>

      {showReviewForm && (
        <div>
          <label>
            Title:
            <input type="text" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} />
          </label>
          <br />
          <label>
            Description:
            <textarea value={reviewDescription} onChange={(e) => setReviewDescription(e.target.value)} />
          </label>
          <br />
          <label>
            Visibility:
            <label>
              Public
              <input type="radio" value="public" checked={reviewVisibility === 'public'} onChange={() => setReviewVisibility('public')} />
            </label>
            <label>
              Private
              <input type="radio" value="private" checked={reviewVisibility === 'private'} onChange={() => setReviewVisibility('private')} />
            </label>
          </label>
          <br />
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      <h3>Reviews</h3>
      <ul>
        {businessReviews.map((review) => (
          <li key={review.id}>
            <p>Title: {review.title}</p>
            <p>Description: {review.description}</p>
            <Link to={`/users/${review.userId}`}>{review.userName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessProfile;
