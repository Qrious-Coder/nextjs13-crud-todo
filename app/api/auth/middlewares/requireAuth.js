import { verify } from 'jsonwebtoken';

export const requireAuth = (handler) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      console.log('token', token);
      if (!token) {
        return res.status(401).send('Unauthorized');
      }

      const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key

      // Verify the access token using your secret key
      const decodedToken = verify(token, secretKey);
      console.log('decodedToken', decodedToken);

      if (!decodedToken) {
        return res.status(401).send('Unauthorized');
      }

      req.user = decodedToken.user; // Assuming the user object is present in the token
      return handler(req, res, next);
    } catch (err) {
      console.error('Auth error:', err);
      return res.status(500).send('Access denied');
    }
  };
};
