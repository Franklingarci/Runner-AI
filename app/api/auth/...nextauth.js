// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "90608531680-kqar98pusuf5fbo5e5gtafrqfmv2qdq5.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    GitHubProvider({
      clientId: "Ov23liWNPTPxSHXhHHLK",
      clientSecret: "ca3a4788480654bcc3c9e0cf0197b8725caf3970",
    }),
  ],
  pages: {
    signIn: '/signin',  // Custom sign-in page (if any)
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Customize sign-in behavior if needed
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Customize redirect behavior if needed
      return baseUrl;
    },
  },
});
