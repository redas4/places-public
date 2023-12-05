import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [registrationType, setRegistrationType] = useState();

  const handleRegistration = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    let endpoint;
    if(registrationType === 'user'){
      endpoint = '/users/register-user';
    } else if (registrationType === 'business'){
      endpoint = '/businesses/register-business';
    } else {
      toast.error('You must select an account type');
      return;
    }

    try {
      const { data: responseData } = await axios.post(endpoint, { name, email, password});
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
      <h2>Register</h2>
      <div>
        <label>Please Select Account Type</label>
        <button onClick={() => setRegistrationType('user')}>User</button>
        <button onClick={() => setRegistrationType('business')}>Business</button>
        <form onSubmit={handleRegistration}>
          <label>Name:</label>
          <input type='name' placeholder='name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
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
