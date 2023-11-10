
import React, { useState } from 'react';

const Login = () => {

  return (
    <div>
      <h2>Login</h2>
      <form >
        <div>
          <label>Email:</label>
          <input />
        </div>
        <div>
          <label>Password:</label>
          <input  />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        <button >New User</button>
        <button >New Business</button>
      </div>
    </div>
  );
};

export default Login;