import React, {useEffect, useState} from 'react';
import API from '../api';
export default function AdminDashboard(){
  const [users,setUsers]=useState([]), [stores,setStores]=useState([]);
  useEffect(()=> {
    const token = localStorage.getItem('token');
    if(token) API.defaults.headers.common['Authorization']='Bearer '+token;
    API.get('/users').then(r=> setUsers(r.data)).catch(()=>{});
    API.get('/stores').then(r=> setStores(r.data)).catch(()=>{});
  },[]);
  return <div>
    <h2>Admin Dashboard (requires admin role)</h2>
    <div>
      <h3>Users</h3>
      <table border={1}><thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>{users.map(u=> <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}</tbody>
      </table>
    </div>
    <div>
      <h3>Stores</h3>
      <table border={1}><thead><tr><th>Name</th><th>Address</th><th>Average</th></tr></thead>
        <tbody>{stores.map(s=> <tr key={s.id}><td>{s.name}</td><td>{s.address}</td><td>{s.averageRating}</td></tr>)}</tbody>
      </table>
    </div>
  </div>;
}
