import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import VerifyOtp from './pages/VerifyOtp';
import Account from './pages/Account';
import Statement from './pages/Statement';
import axios from 'axios';
import Transfer from './pages/Transfer';
import ProtectedRouteClinet from './components/ProtectedRouteClinet';

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/verify" element={<VerifyOtp />} />
        <Route path="/" element={<ProtectedRouteClinet> <Home /> </ProtectedRouteClinet>}>
          <Route index element={<div className="mt-32">Welcome to the Dashboard</div>} />
          <Route path="account" element={<Account />} />
          <Route path="statement" element={<Statement />} />
          <Route path="transfer" element={<Transfer />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
