import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const navigate = useNavigate();
  const { setAccount, resetAccount } = useContext(UserContext);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    resetAccount();
  }, [resetAccount]); 

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const { data: responseData } = await axios.post('/login', {
        email: data.email,
        password: data.password,
      });
      console.log('Here is the response data:  ', responseData )
      if (responseData.error) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        setData({ ...data, password: '' }); 

        setAccount(responseData.user); 
        toast.success('Login successful. Redirecting to the dashboard.');

        const homeRoute = responseData.type === 'business' ? '/business-home' : '/user-home';
        navigate(homeRoute);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
