import { decodeToken } from '@/utils/token'

export const requireAuth = (handler) => {
  return async (req) => {
    try {
      //Todo: save token to cookies
      const authorizationHeader =
        req.headers instanceof Headers
          ? req.headers.get('authorization')
          : req.headers.authorization
      let token = authorizationHeader?.split(' ')[1];

      // if no token, use demo data
      if (!token) {
        req.user = process.env.DEMO_USER_ID;
        return handler(req);
      }

      const decodedToken = decodeToken(token);
      if (!decodedToken) {
        return new Response( 'Cannot decode!', { status: 401 })
      }

      req.user = decodedToken.sub;

      return handler(req);
    } catch (err) {
      console.error('Auth error:', err);
      return new Response( `Middleware error: ${err}`, { status: 500 })
    }
  };
};
