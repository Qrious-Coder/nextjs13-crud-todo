import { verify } from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';

export const verifyToken = (token, secretKey) => {
  try {
    const decodedToken = verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};


export const generateAccessToken = (user) => {
  const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key
  const token = sign({ sub: user.id }, secretKey, { expiresIn: '1h' }); // Customize the expiration as needed
  return token;
};

