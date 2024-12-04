import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const users = [
  { id: 1, name: 'Admin', email: 'admin@example.com', username: 'admin', password: '123456' },
  { id: 2, name: 'User One', email: 'user1@example.com', username: 'user1', password: 'password1' },
  { id: 3, name: 'User Two', email: 'user2@example.com', username: 'user2', password: 'password2' },
  { id: 4, name: 'User Three', email: 'user3@example.com', username: 'user3', password: 'password3' },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Enter your username' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
      },
      async authorize(credentials) {
        const user = users.find(
          u => u.username === credentials.username && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

       
        throw new Error('Invalid username or password');
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login', 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
  session: {
    strategy: 'jwt', 
    maxAge: 30 * 24 * 60 * 60, 
  },
  debug: process.env.NODE_ENV === 'development', 
});

export { handler as GET, handler as POST };
