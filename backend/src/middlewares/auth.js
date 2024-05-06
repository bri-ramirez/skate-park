import 'dotenv/config';
import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY;

export const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({
          status: 401,
          message: 'Usuario no autorizado, por favor inicia sesión',
        });
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secretKey, (err, data) => {
      err
        ? res
            .status(401)
            .json({
              status: 401,
              message: 'Usuario no autorizado, por favor inicia sesión',
            })
        : next();
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
