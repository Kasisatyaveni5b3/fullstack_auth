const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing authorization header' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid authorization header' });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'replace-with-a-secure-secret');
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token user' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
