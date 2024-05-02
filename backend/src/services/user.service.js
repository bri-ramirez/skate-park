import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const createUser = async (user) => {
  const userCreated = await User.create({
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  });

  return userCreated;
};

export const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email, status: true },
  });
  return user;
};
