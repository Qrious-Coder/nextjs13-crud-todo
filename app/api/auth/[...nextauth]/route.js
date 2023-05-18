import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

import User from '@/db/models/User'
import {dbConnect} from "@/db/dbConnect";
import {generateAccessToken} from "@/app/utils/token";

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

        return user
      }
    })
  ],

  //If user found, run callback to return token with user info
  callbacks: {
    
    async jwt({token, user, account}){
      //User returned undefined
      return token
    },

    async session({ session, token, user }) {
      console.log(`session`, session )
      if (token?._id) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/entry',
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
