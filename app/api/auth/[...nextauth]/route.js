import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

import User from '@/db/models/User'
import { dbConnect } from "@/db/dbConnect";
import { generateAccessToken } from "@/utils/token";

export const authOptions = {
  // Enable JSON Web Tokens
  // session: {
  //   strategy: "jwt",
  // },
  session: {
    jwt: true,
    accessToken: true // Add this line to enable access token
  },

  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"}
      },

      authorize: async (credentials) => {
        dbConnect()
        const user = await User.findOne({email: credentials?.email}).select('+password')
        if(!user) { throw new Error('Invalid user')}

        const pwValid = await user.comparePassword(credentials.password)
        if(!pwValid){ throw new Error("Wrong password!") }
        // Generate the access token
        const accessToken = generateAccessToken(user);

        // Return the user and access token
        return { user, accessToken };
        // return user
      }
    })
  ],

  //If user found, run callback to return token with user info
  callbacks: {
    async session({ session, token, user }) {
      console.log(session)
      if (session) {
        session.user.id = token.sub;
        session.accessToken = token.accessToken; // Access the accessToken from the token
      }
      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },

  },
  pages: {
    signIn: '/entry',
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
