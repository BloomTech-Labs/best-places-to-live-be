const express = require('express');
const router = express.Router();
const {Basic} = require('../models/basic');
const {User} = require('../models/User');

router.get('/', (req, res) => {
  res.render('welcome');
});

router.get('/all', async (req, res) => {
  const result = await Basic.find().sort('name');
  res.json(result);
});

router.post('/add', (req, res) => {
  const basic = new Basic({
    name: req.body.name,
  });
  basic.save();
  res.json(basic);
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await Basic.findByIdAndRemove({_id: req.params.id});
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get('/allusers', async (req, res) => {
  const result = await User.find().sort('name');
  res.json(result);
});

router.post('/user', async (req, res) => {
  const newUser = new User({
    name: req.body.name || null,
    email: req.body.email,
  });
  try {
    const userCreated = await newUser.save();
    res.json(`Welcome ${userCreated.name}!`);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/user/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndRemove({_id: req.params.id});
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
