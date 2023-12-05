// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/users/profile/${userId}`);
        const userData = response.data;
        setUser(userData);

        const reviewsResponse = await axios.get(`/users/profile/${userId}/reviews`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <div>
      {user && (
        <>
          <h2>{user.name}'s Profile</h2>
          <p>Name: {user.name}</p>
        <h3>Reviews</h3>
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <div>
                <p>
                  <strong>Business Name:</strong>{" "}
                  <a href={`link/to/business/${review.businessID._id}`}>{review.businessID.name}</a>
                </p>
                <p>
                  <strong>Title:</strong> {review.title}
                </p>
                <p>
                  <strong>Description:</strong> {review.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
};

export default UserProfile;

