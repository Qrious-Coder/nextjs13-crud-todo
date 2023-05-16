import { verify } from 'jsonwebtoken';

export const verifyToken = (token, secretKey) => {
  try {
    const decodedToken = verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
