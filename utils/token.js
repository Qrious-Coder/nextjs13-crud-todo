import { sign } from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key

export const generateAccessToken = (user) => {
  console.log(`generateAccessToken`, user)

  const token = sign({ sub: user._id }, secretKey, { expiresIn: '3d' }); // Customize the expiration as needed
  return token;
};

