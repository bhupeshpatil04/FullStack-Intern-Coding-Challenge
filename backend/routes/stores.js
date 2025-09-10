const express = require('express');
const router = express.Router();
const { Store, Rating, User } = require('../models');
const auth = require('../middleware/authMiddleware');
const { Op } = require('sequelize');

// Admin can add stores
router.post('/', auth, async (req,res)=>{
  if(req.user.role !== 'admin') return res.status(403).json({error:'Forbidden'});
  const { name,email,address, ownerId } = req.body;
  const s = await Store.create({ name,email,address, ownerId });
  res.json(s);
});

// List stores (with search and sorting)
router.get('/', auth, async (req,res)=>{
  const { name, address, sortBy='name', dir='ASC' } = req.query;
  const where = {};
  if(name) where.name = { [Op.like]: `%${name}%` };
  if(address) where.address = { [Op.like]: `%${address}%` };
  const stores = await Store.findAll({
    where,
    include: [{ model: Rating }],
    order:[[sortBy,dir]]
  });
  // compute overall rating and user's rating if provided
  res.json(stores.map(s=>{
    const vals = s.Ratings.map(r=>r.value);
    const avg = vals.length ? (vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(2) : null;
    return { id:s.id, name:s.name, email:s.email, address:s.address, averageRating: avg };
  }));
});

// Owner dashboard: list users who rated their store and average
router.get('/owner/:storeId', auth, async (req,res)=>{
  const store = await Store.findByPk(req.params.storeId, { include: [{ model: Rating, include:[User] }, { model: User, as:'owner' }]});
  if(!store) return res.status(404).json({error:'Store not found'});
  if(req.user.role !== 'owner' && req.user.role !== 'admin') return res.status(403).json({error:'Forbidden'});
  // ensure owner owns the store unless admin
  if(req.user.role === 'owner' && store.ownerId !== req.user.id) return res.status(403).json({error:'Forbidden'});
  const ratings = store.Ratings.map(r=>({ id:r.id, value:r.value, user: { id:r.User.id, name:r.User.name, email:r.User.email } }));
  const avg = ratings.length ? (ratings.reduce((a,b)=>a+b.value,0)/ratings.length).toFixed(2) : null;
  res.json({ ratings, average: avg });
});

module.exports = router;
