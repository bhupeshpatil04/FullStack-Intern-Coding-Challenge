import React, {useEffect, useState} from 'react';
import API, { setToken } from '../api';

export default function Stores(){
  const [stores,setStores]=useState([]);
  const [rating,setRating]=useState({});
  useEffect(()=> {
    const token = localStorage.getItem('token');
    if(token) setToken(token);
    API.get('/stores').then(r=> setStores(r.data)).catch(()=>{});
  },[]);
  async function submitRating(storeId, val){
    try{
      await API.post('/ratings/'+storeId, { value: val });
      alert('Rating submitted');
    }catch(e){ alert('Error'); }
  }
  return <>
    <h2>Stores</h2>
    <div>
      {stores.map(s=> (
        <div key={s.id} style={{border:'1px solid #ddd', padding:10, margin:10}}>
          <h3>{s.name}</h3>
          <div>{s.address}</div>
          <div>Average: {s.averageRating || 'No ratings'}</div>
          <div>
            <label>Your rating:
              <select value={rating[s.id]||''} onChange={e=> setRating({...rating, [s.id]: e.target.value})}>
                <option value=''>--</option>
                {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <button onClick={()=> submitRating(s.id, Number(rating[s.id]))}>Submit</button>
          </div>
        </div>
      ))}
    </div>
  </>;
}
