import { verify } from 'jsonwebtoken';
import { Response } from 'next';

export const requireAuth = (handler) => {
  return async (req) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return new Response('Unauthorized', { status: 401 });
      }

      const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key

      // Verify the access token using your secret key
      const decodedToken = verify(token, secretKey);
      console.log('decodedToken', decodedToken);

      if (!decodedToken) {
        return new Response('Unauthorized', { status: 401 });
      }

      req.user = decodedToken.user; // Assuming the user object is present in the token
      return handler(req);
    } catch (err) {
      console.error('Auth error:', err);
      return new Response('Access denied', { status: 500 });
    }
  };
};
