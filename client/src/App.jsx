import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import useGetCurrentUser from './hooks/useGetCurrentUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Genrate from './pages/Genrate';

export const serverUrl = "http://localhost:8000";

const App = () => {
  useGetCurrentUser();
  const {userData}=useSelector(state=>state.user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={userData?<Dashboard/>:<Home/>} />
        <Route path='/generate' element={userData?<Genrate/>:<Home/>} />

      </Routes>

      {/* GLOBAL TOAST SYSTEM */}
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
};

export default App;