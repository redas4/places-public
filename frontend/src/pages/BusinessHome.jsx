import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { Navigate } from 'react-router-dom';

const BusinessHome = () => {
  const { account } = useContext(UserContext);
  const [businessDetails, setBusinessDetails] = useState({});
  const [editable, setEditable] = useState(false);
  const [businessReviews, setBusinessReviews] = useState([]);
  const [editedDetails, setEditedDetails] = useState({
    name: businessDetails.name,
    email: businessDetails.email,
    description: businessDetails.description,
  });

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        if (account && account.type === 'business') {
          const response = await axios.post('/businesses/profile', {
            accountId: account.id,
          });
          const details = response.data;
          setBusinessDetails(details);
          setEditedDetails(details);
  
          const reviewsResponse = await axios.get(`/businesses/reviews-about-me`, {
            params: { accountId: account.id }, 
          });
          const reviews = reviewsResponse.data;
          setBusinessReviews(reviews);
        }
      } catch (error) {
        console.error('Error fetching business details or reviews:', error);
      }
    };
  
    if (account && account.type === 'business') {
      fetchBusinessDetails();
    }
  }, [account]); 
  
  const handleEditClick = () => {
    setEditable(true);
  };

  const handleCancelClick = () => {
    setEditable(false);
    setEditedDetails({
      accountId: account.id,
      name: businessDetails.name || '',
      email: businessDetails.email || '',
      description: businessDetails.description || '',
    });
  };

  const handleConfirmClick = async () => {
    try {
      setBusinessDetails(editedDetails);
      await axios.put(`/businesses/edit-profile`, editedDetails);
      setEditable(false);
    } catch (error) {
      console.error('Error updating business details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>My Business</h1>
      <p>
        Name: {editable ? (
          <input
            type="text"
            name="name"
            value={editedDetails.name}
            onChange={handleInputChange}
          />
        ) : (
          businessDetails.name
        )}
      </p>
      <p>
        Email: {editable ? (
          <input
            type="text"
            name="email"
            value={editedDetails.email}
            onChange={handleInputChange}
          />
        ) : (
          businessDetails.email
        )}
      </p>
      <p>
        Description: {editable ? (
          <input
            type="text"
            name="description"
            value={editedDetails.description}
            onChange={handleInputChange}
          />
        ) : (
          businessDetails.description
        )}
      </p>

      {editable ? (
        <>
          <button onClick={handleConfirmClick}>Confirm</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEditClick}>Edit Profile</button>
      )}

      <h2>Reviews about Me:</h2>
      {/* Display reviews about the currently logged-in business */}
      {businessReviews && businessReviews.length > 0 ? (
        <ul>
          {businessReviews.map((review) => (
            <li key={review._id}>
              <h3>{review.title}</h3>
              <p>{review.description}</p>
              {/* Assuming the user ID is stored in the review.userId field */}
              <p>
                By: <Link to={`/users/${review.userId}`}>{review.userName}</Link>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default BusinessHome;
