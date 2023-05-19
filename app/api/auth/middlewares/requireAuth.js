import { verify } from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key

export const requireAuth = (handler) => {
  return async (req) => {
    try {
      //Todo: save token to cookies
      // Or learn to decode next-auth-session-cookies
      const authorizationHeader = 
        req.headers instanceof headers
          ? req.headers.get('authorization')
          : req.headers.authorization
      const token = authorizationHeader?.split(' ')[1];

      //BUG: can't get token from headers
      // req.headers is an Object which cannot extract [authorization]
      token = 'token'

      console.log('token', token);
      if (!token) {
        return res.status(401).json('No token found!');
      }

      // Verify the access token using your secret key
      const decodedToken = verify(token, secretKey);
      console.log('decodedToken', decodedToken);

      if (!decodedToken) {
        return res.status(401).json('Cannot decoded token');
      }

      req.user = decodedToken.sub; // Assuming the user object is present in the token
      return handler(req);
    } catch (err) {
      console.error('Auth error:', err);
      return res.status(500).json('Auth error');
    }
  };
};
