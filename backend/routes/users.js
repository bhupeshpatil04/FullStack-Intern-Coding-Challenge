const express = require('express');
const router = express.Router();
const { User, Store, Rating } = require('../models');
const auth = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

// Admin-only: create users (admin, user, owner)
router.post('/', auth, async (req,res)=>{
  if(req.user.role !== 'admin') return res.status(403).json({error:'Forbidden'});
  const { name,email,address,password,role } = req.body;
  try{
    const hashed = await bcrypt.hash(password,10);
    const u = await User.create({ name,email,address,password:hashed, role: role || 'user' });
    res.json(u);
  }catch(e){ res.status(500).json({ error: e.message }); }
});

// Get list of users (with filters & sorting)
router.get('/', auth, async (req,res)=>{
  if(req.user.role !== 'admin') return res.status(403).json({error:'Forbidden'});
  const { q, role, sortBy='name', dir='ASC' } = req.query;
  const where = {};
  if(role) where.role = role;
  const users = await User.findAll({ where, order:[[sortBy, dir]] });
  res.json(users);
});

// Update password
router.put('/password', auth, async (req,res)=>{
  const { oldPassword, newPassword } = req.body;
  const ok = await bcrypt.compare(oldPassword, req.user.password);
  if(!ok) return res.status(400).json({ error: 'Old password incorrect' });
  const hashed = await bcrypt.hash(newPassword,10);
  req.user.password = hashed;
  await req.user.save();
  res.json({ success:true });
});

// Get user detail
router.get('/:id', auth, async (req,res)=>{
  if(req.user.role !== 'admin' && req.user.id != req.params.id) return res.status(403).json({error:'Forbidden'});
  const u = await User.findByPk(req.params.id);
  res.json(u);
});

module.exports = router;
