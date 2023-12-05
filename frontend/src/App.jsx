import './App.css';
import {Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header';
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import UserHome from './pages/UserHome';
import BusinessHome from './pages/BusinessHome'
import MyProfile from './pages/MyProfile'
import UserProfile from './pages/UserProfile'
import BusinessProfile from './pages/BusinessProfile'
import MyReviews from './pages/MyReviews'

axios.defaults.baseURL = process.env.NODE_ENV === 'DEVELOPMENT'
  ? 'http://localhost:8000'   
  : 'https://places-public.vercel.app:8000';
  axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
    <Header />
    <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/user-home' element={<UserHome />} />
      <Route path='/business-home' element={<BusinessHome />} />
      <Route path='/users/profile' element={<MyProfile />} />
      <Route path="/my-reviews/:accountId" element={<MyReviews />} />
      <Route path="/users/:userId" element={<UserProfile />} />
      <Route path="/business/:businessId" element={<BusinessProfile />} />
    </Routes>
    </UserContextProvider>
  )
}

export default App
