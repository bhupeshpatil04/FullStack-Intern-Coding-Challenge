const jwt = require('jsonwebtoken');
const { User } = require('../models');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function authMiddleware(req, res, next) {
  const h = req.headers.authorization;
  if(!h) return res.status(401).json({ error: 'Missing auth token' });
  const token = h.split(' ')[1];
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if(!user) return res.status(401).json({ error:'User not found' });
    req.user = user;
    next();
  }catch(e){ res.status(401).json({ error: 'Invalid token' }); }
}

module.exports = authMiddleware;
