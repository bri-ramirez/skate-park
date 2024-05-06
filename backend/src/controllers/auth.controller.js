import 'dotenv/config';
import { errorMessage } from '../helpers/message.js';
import { validateLogin, validateRegister } from '../helpers/validate.js';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../services/user.service.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const secretKey = process.env.SECRET_KEY;
const urlServer = process.env.URL_SERVER;
const tokenOptions = { expiresIn: '30m' };

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
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      specialty: user.specialty,
      expertise: user.expertise,
      status: user.status,
      photo: user.photo ? `${urlServer}/static/${user.photo}` : null,
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

    const userExists = await getUserByEmail(email);
    if (userExists) {
      throw new Error('El email ya está registrado');
    }

    // si req.files es null, photo sera null.
    const photo = req.files?.photo;

    let newName = null;
    if (photo) {
      const extension = photo.name.split('.').pop();
      newName = `${uuidv4()}.${extension}`;
      await photo.mv(`./src/uploads/${newName}`);
    }

    const user = await createUser({
      name,
      email,
      password,
      specialty,
      expertise,
      photo: newName,
    });

    const userCreated = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      specialty: user.specialty,
      expertise: user.expertise,
      status: user.status,
      photo: user.photo ? `${urlServer}/static/${user.photo}` : null,
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
