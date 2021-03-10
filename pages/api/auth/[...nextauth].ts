import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/',
    error: '/auth/error',
    signOut: '/auth/signout',
  },
  callbacks: {
    redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? '/' : '/vote';
    },
  },
});
