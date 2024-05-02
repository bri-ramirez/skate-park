import 'dotenv/config';
import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY;

export const auth = (req, res, next) => {
  try {
    const { token } = req.query;

    jwt.verify(token, secretKey, (err, data) => {
      err
        ? res
            .status(401)
            .json({
              status: 401,
              message: 'Usuario no autorizado, por favor inicar sesión',
            })
        : next();
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
