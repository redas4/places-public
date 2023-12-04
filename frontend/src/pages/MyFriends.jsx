import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function ViewFriends() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [registrationType, setRegistrationType] = useState('user');

  const handleRegistration = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    const endpoint = registrationType === 'user' ? '/register-user' : '/register-business';

    try {
      const { data: responseData } = await axios.post(endpoint, { email, password});
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({});
        toast.success('Registration successful. Welcome!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setRegistrationType('user')}>User</button>
        <button onClick={() => setRegistrationType('business')}>Business</button>
        <form onSubmit={handleRegistration}>
          <label>Email:</label>
          <input type='email' placeholder='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          <label>Password:</label>
          <input type='password' placeholder='password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}