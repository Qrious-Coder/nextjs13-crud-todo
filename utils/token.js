import { sign } from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;
export const generateAccessToken = (user) => {
  const token = sign({ sub: user._id }, secretKey, { expiresIn: '3d' });
  return token;
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('token');
  return accessToken || '';
}

export const saveAccessToken = (accessToken) => {
  localStorage.setItem('token', 'Bearer ' + accessToken);
}
