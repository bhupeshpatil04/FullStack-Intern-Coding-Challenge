import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
export default function Signup(){
  const [name,setName]=useState(''),[email,setEmail]=useState(''),[addr,setAddr]=useState(''),[password,setPassword]=useState('');
  const nav = useNavigate();
  async function submit(e){
    e.preventDefault();
    try{
      await API.post('/auth/signup', { name, email, address:addr, password });
      alert('Signup success. Please login.');
      nav('/login');
    }catch(e){
      alert(e.response?.data?.error || 'Signup error');
    }
  }
  return (
    <form onSubmit={submit}>
      <h2>Signup</h2>
      <div><input value={name} onChange={e=>setName(e.target.value)} placeholder='Full name (20-60 chars)' required/></div>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' required/></div>
      <div><input value={addr} onChange={e=>setAddr(e.target.value)} placeholder='Address' /></div>
      <div><input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' required/></div>
      <button>Signup</button>
    </form>
  );
}
