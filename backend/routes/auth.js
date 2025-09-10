const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.post('/signup', async (req, res) => {
  try {
    const { name, email, address, password } = req.body;
    if(!name || name.length < 20 || name.length > 60) return res.status(400).json({error:'Name must be 20-60 chars'});
    if(!password || password.length < 8 || password.length > 16) return res.status(400).json({error:'Password 8-16 chars'});
    // simple validations
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, address, password: hashed, role: 'user' });
    res.json({ id: user.id, email: user.email });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/login', async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ where:{ email }});
    if(!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, role: user.role, name: user.name, id: user.id });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

module.exports = router;
