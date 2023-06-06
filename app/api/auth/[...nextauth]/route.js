import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import User from '@/db/models/User'
import { dbConnect } from "@/db/dbConnect";
import { generateAccessToken } from "@/utils/token";

export const authOptions = {
  session: {
    jwt: true,
    accessToken: true
  },
  secret: process.env.SECRET_KEY,
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

        return user;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
        token.accessToken = generateAccessToken(user)
      }
      return token;
    },
    async session({ session, token }) {
      if(token){
        session.user = token.user
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  pages: {
    signIn: '/entry',
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
