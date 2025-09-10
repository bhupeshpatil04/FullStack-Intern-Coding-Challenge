const express = require('express');
const router = express.Router();
const { Rating, Store } = require('../models');
const auth = require('../middleware/authMiddleware');

// submit or update rating
router.post('/:storeId', auth, async (req,res)=>{
  const { value } = req.body;
  const storeId = req.params.storeId;
  if(!value || value <1 || value>5) return res.status(400).json({error:'Rating 1-5'});
  const existing = await Rating.findOne({ where:{ userId: req.user.id, storeId }});
  if(existing){
    existing.value = value;
    await existing.save();
    return res.json(existing);
  }
  const r = await Rating.create({ value, userId: req.user.id, storeId });
  res.json(r);
});

// get user's rating for store
router.get('/:storeId/me', auth, async (req,res)=>{
  const r = await Rating.findOne({ where:{ userId:req.user.id, storeId: req.params.storeId }});
  res.json(r);
});

module.exports = router;
