import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { dbConnect } from "@db/dbConnect";

//define the API routes related to authentication using next-auth.
export default NextAuth({
  providers: [
    Providers.Credentials({
      // Configure the credentials provider options
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      //provide a custom `authorize` function
      authorize: async (credentials) => {
        // Add your custom logic to authenticate the user
        const { email, password } = credentials;

        try {
          // Connect to MongoDB
          const { db } = await dbConnect();

          // Retrieve the user from the database based on the email
          const user = await db.collection('users').findOne({ email });

          if (user) {
            // Use bcrypt to compare the provided password with the hashed password in the database
            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (passwordsMatch) {
              // Return an object with the user information
              return {
                id: user._id,
                email: user.email,
                name: user.name,
              };
            }
          }

          // Return null or false if authentication fails
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error('An error occurred during authentication');
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, user) {
      // Add the user data to the session
      session.user = user;
      return session;
    },
    async jwt(token, user) {
      // Add the user ID to the JWT token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
