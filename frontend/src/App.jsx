import './App.css';
import {Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header';
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/Login';

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />;
      <Route path='/register' element={<Register />} />;
      <Route path='/login' element={<Login />} />;
    </Routes>
      
    </>
  )
}

export default App