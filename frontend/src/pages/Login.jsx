import { useState } from 'react';
import axios from 'axios'
const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const loginUser = (e) => {
        e.preventDefault();
        axios.get()
    }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <label>Email:</label>
        <input type='email' placeholder='email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <label>Password:</label>
        <input type='password' placeholder='password' value={data.passowrd} onChange={(e) => setData({...data, passowrd: e.target.value})}/>
        <button type='submit'>Login</button>
      </form>

    </div>
  );
};

export default Login;