import bCrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const config = require('../../etc/config.json');
const { secret } = config.jwt;
import Users from '../models/users';


const signIn = (req, res) => {
  const { login, password } = req.body;
  Users.findOne({ login })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: 'User does not exist!' });
      }
      const isValid = bCrypt.compareSync(password, user.password);
      if (isValid) {
        const token = jwt.sign(user._id.toString(), secret);
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentails!' });
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

export default signIn;
