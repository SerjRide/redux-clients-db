import jwt from 'jsonwebtoken';
const config = require('../../etc/config.json');
const { secret } = config.jwt;

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({ message: "Token not provided!" });
  }
  const token = authHeader.replace('Bearer', '');
  try {
    jwt.verify(token, secret);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ message: "Invalid Token!" });
    }
  }

  next();
};
