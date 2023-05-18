import { verify } from 'jsonwebtoken';
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
export const requireAuth = (handler) => {
  return async (req) => {
    try {
      const token = await getToken({
        req: req,
        secret: secret,
        raw: true,
      });

      // Verify the access token using your secret key
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      console.log(`decodedToken`, decodedToken);

      if (!decodedToken) {
        return new Response('Unauthorized', { status: 401 });
      }

      req.user = decodedToken.user; // Assuming the user object is present in the token
      return handler(req);
    } catch (err) {
      console.error("Auth error:", err);
      return new Response("Access denied" , { status: 500 });
    }
  };
};
