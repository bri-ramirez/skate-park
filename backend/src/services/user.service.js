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

export const getAllUsers = async () => {
  const users = await User.findAll({ where: { role: 'user' }});
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
}

export const updateUser = async (id, user) => {
  const userFound = await User.findByPk(id);
  if (!userFound) {
    throw new Error('Usuario no encontrado');
  }

  const userUpdated = await userFound.update(user);
  return userUpdated;
}

export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  await user.destroy();
  return true;
}