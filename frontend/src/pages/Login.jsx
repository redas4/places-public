import React, { useState } from 'react';

const Login = () => {

const loginUser = (e) => {
    e.preventDefault();
    
}

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <label>Email:</label>
        <input type='email' placeholder='email' />
        <label>Password:</label>
        <input type='password' placeholder='password' />
        <button type='submit'>Login</button>
      </form>

    </div>
  );
};

export default Login;