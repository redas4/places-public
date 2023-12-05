import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API call to fetch all users
        const response = await axios.get('/users/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {Array.isArray(users) &&
          users.map((user) => (
            <li key={user._id}>
              {/* Use navigate to the user profile page */}
              <button onClick={() => navigate(`/users/${user._id}`)}>
                {user.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UsersList;
