import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import Home from './pages/Home';
import Header from './pages/Header';
import RegisterForm from './components/auth/RegisterForm';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
    </>
    
  );
}

export default App;

