import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Stores from './pages/Stores';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';

export default function App(){
  return (
    <BrowserRouter>
      <nav style={{padding:10, borderBottom:'1px solid #ddd'}}>
        <Link to='/'>Stores</Link> | <Link to='/login'>Login</Link> | <Link to='/signup'>Signup</Link> | <Link to='/admin'>Admin</Link>
      </nav>
      <div style={{padding:20}}>
        <Routes>
          <Route path='/' element={<Stores/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/admin' element={<AdminDashboard/>} />
          <Route path='/owner' element={<OwnerDashboard/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
