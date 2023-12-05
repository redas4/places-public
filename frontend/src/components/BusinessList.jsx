import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BusinessList = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API call to fetch all users
        const response = await axios.get('/businesses/businesses');
        setBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>BusinessList</h2>
      <ul>
        {Array.isArray(businesses) &&
          businesses.map((business) => (
            <li key={business._id}>
              {/* Use navigate to the user profile page */}
              <button onClick={() => navigate(`/business/${business._id}`)}>
                {business.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BusinessList;
