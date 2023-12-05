import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { Navigate } from 'react-router-dom';

const MyProfile = () => {
  const { account } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({});
  const [editable, setEditable] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    name: userDetails.name || '',
    email: userDetails.email || '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (account && account.type === 'user') {
          const response = await axios.post('/users/profile', {
            accountId: account.id,
          });
          const details = response.data;
          console.log('Here are my details:     ', details)
          setUserDetails(details);
          setEditedDetails(details);

        }
      } catch (error) {
        console.error('Error fetching user details or reviews:', error);
      }
    };

    fetchUserDetails();
  }, [account]);

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleCancelClick = () => {
    setEditable(false);
    setEditedDetails({
      accountId: account.id,
      name: userDetails.name || '',
      email: userDetails.email || '',
    });
  };

  const handleConfirmClick = async () => {
    try {
      setUserDetails(editedDetails);
      await axios.put(`/users/edit-profile`, editedDetails);
      setEditable(false);
    } catch (error) {
      console.error('Error updating user details:', error);
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
      <h1>My Profile</h1>
      {userDetails.name ? ( 
        <>
          <p>
            Name: {editable ? (
              <input
                type="text"
                name="name"
                value={editedDetails.name}
                onChange={handleInputChange}
              />
            ) : (
              userDetails.name
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
              userDetails.email
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
};

export default MyProfile;
