import 'dotenv/config';
import { errorMessage } from '../helpers/message.js';
import { validateLogin, validateRegister } from '../helpers/validate.js';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../services/user.service.js';
import bcrypt from 'bcrypt';

const secretKey = process.env.SECRET_KEY;
const tokenOptions = { expiresIn: '120s' };

export const login = async (req, res) => {
  try {
    validateLogin(req);

    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    
    if (!user) {
      throw new Error('Credenciales incorrectas');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Credenciales incorrectas');
    }

    const userCreated = {
      name: user.name,
      email: user.email,
      role: user.role,
      specialty: user.specialty,
      expertise: user.expertise,
      status: user.status,
    };

    const token = jwt.sign({
      user: userCreated,
    }, secretKey, tokenOptions);

    res.status(200).json({
      status: 'Ok',
      token: token,
      loggedUser: userCreated,
    });
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    validateRegister(req);

    const { name, email, password, specialty, expertise } = req.body;

    const user = await createUser({
      name,
      email,
      password,
      specialty,
      expertise,
    });

    const userCreated = {
      name: user.name,
      email: user.email,
      role: user.role,
      specialty: user.specialty,
      expertise: user.expertise,
      status: user.status,
    };

    const token = jwt.sign(
      {
        user: userCreated,
      },
      secretKey,
      tokenOptions
    );

    res.status(200).json({
      status: 'Ok',
      token: token,
      loggedUser: userCreated,
    });
  } catch (error) {
    errorMessage(error.message);
    return res.status(500).json({ message: error.message });
  }
};
