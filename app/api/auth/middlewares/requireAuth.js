import { getToken } from 'next-auth/jwt';

//the decoded token is passed as param from the client side
export const requireAuth = (handler) => {
  return async (req) => {
    try {
      const token = await getToken({ req, secret: process.env.SECRET_KEY });
      console.log(`token`,token);
      if (!token) {
        return new Response('Unauthorized', { status: 401 });
      }
      req.user = token;
      return handler(req);
    } catch (err) {
      console.error("Auth error:", err);
      return new Response({ message: "Access denied" }, { status: 500 });
    }
  };
};
