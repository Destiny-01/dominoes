import { User } from '../models/User.model';
const jwt = require('jsonwebtoken');

export default (user: User) => {
  const signedJWT = jwt.sign(user, process.env.JWT_SECRET);
  return signedJWT;
};
