import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

import User from '@/db/models/User'
import {dbConnect} from "@/db/dbConnect";

export default NextAuth({
  // Enable JSON Web Tokens
  session: {
    jwt: true
  },

  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"}
      },
      // Authorize callback is ran upon calling the signin function
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
    async jwt({token, user}){
      if (user) {
        token.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token?._id) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/entry',
  },
})