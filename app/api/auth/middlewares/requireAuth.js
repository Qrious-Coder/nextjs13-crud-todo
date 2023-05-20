import { verify } from 'jsonwebtoken';
import { getSession } from 'next-auth/server';

const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key

export const requireAuth = (handler) => {
  return async (req, res, next) => {
    try {
      console.log(`session`,sessionn)

      const authorizationHeader =
        req.headers instanceof Headers
          ? req.headers.get("authorization")
          : req.headers.authorization

      const token = authorizationHeader?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ error: 'No token found!' });
      }

      const decodedToken = verify(token, secretKey);
      // console.log('@@@decodedToken ========>', decodedToken);

      if (!decodedToken) {
        return res.status(401).json({ error: 'Unable to decode token!' });
      }

      req.user = decodedToken.sub; // Assuming the user object is present in the token
      return handler(req);
    } catch (err) {
      console.error('Auth error:', err);
      return res.status(500).json({ error: 'Auth error:' + err })
    }
  };
};
