import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

const MyReviews = () => {
  const { account } = useContext(UserContext);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        if (account && account.type === 'user') {
          const response = await axios.post(`/users/my-reviews`,{
            accountId: account.id
          });
  
          const reviews = response.data;
          setUserReviews(reviews);
        }
      } catch (error) {
        console.error('Error fetching user reviews:', error);
      }
    };

    fetchUserReviews();
  }, [account]);

  return (
    <>
      <h1>My Reviews:</h1>
      {userReviews && userReviews.length > 0 ? (
        <ul>
          {userReviews.map((review) => (
            <li key={review._id}>
              <h3>{review.title}</h3>
              <h3>{review.businessID.name}</h3>
              <p>{review.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </>
  );
};

export default MyReviews;
