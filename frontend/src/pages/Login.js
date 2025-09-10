import React, {useState} from 'react';
import API, { setToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState(''), [password,setPassword]=useState('');
  const nav = useNavigate();
  async function submit(e){
    e.preventDefault();
    try{
      const res = await API.post('/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      alert('Logged in as '+res.data.role);
      nav('/');
    }catch(e){ alert('Login failed'); }
  }
  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' required/></div>
      <div><input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' required/></div>
      <button>Login</button>
    </form>
  );
}
