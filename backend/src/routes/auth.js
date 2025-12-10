const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    return res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'replace-with-a-secure-secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', auth, async (req, res) => {
  const u = req.user;
  return res.json({ id: u.id, name: u.name, email: u.email });
});

router.put('/me', auth, async (req, res) => {
  try {
    const u = req.user;
    const { name, email, password } = req.body;
    if (email && email !== u.email) {
      const exist = await User.findOne({ where: { email } });
      if (exist) return res.status(400).json({ message: 'Email already in use' });
    }
    u.name = name || u.name;
    u.email = email || u.email;
    if (password) {
      u.password = await bcrypt.hash(password, 10);
    }
    await u.save();
    return res.json({ id: u.id, name: u.name, email: u.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
