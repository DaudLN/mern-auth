import jwt from 'jsonwebtoken';

const generateAuthToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.MERN_JWT_SECRETE, {
    expiresIn: '30d',
  });
  return res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateAuthToken;
