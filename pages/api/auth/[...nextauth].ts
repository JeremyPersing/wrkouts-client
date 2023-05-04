import axios from "axios";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const tokenExpiration = 60 * 60 * 24;

const getRefreshedTokenPair = async (token: any) => {
  try {
    const authHeader = `Bearer ${token.refreshToken}`;

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/token",
      {}, // Don't forget this ;), or you'll waste hours debugging like me
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    if (!data) throw new Error("Unable to retrieve tokens");

    token.refreshToken = data.refreshToken;
    token.accessToken = data.accessToken;

    return { ...token };
  } catch (error: any) {
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
};

const loginOAuthUser = async (token: string | undefined, provider: string) => {
  try {
    if (!token) return null;

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/oauth/login",
      {
        token,
        provider,
      }
    );

    if (!data) return null;

    return data;
  } catch (error: any) {
    return null;
  }
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        const url = `http://localhost:4000/api/v1/${(credentials as any).type}`;

        const body = {
          email: credentials?.email,
          password: credentials?.password,
        };
        try {
          const { data } = await axios.post(url, body);

          if (data) {
            return {
              ...data,
              accessTokenExpires: Date.now() + tokenExpiration * 1000,
            };
          }

          return null;
        } catch (error: any) {
          console.error(error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && account.provider === "google") {
        const data = await loginOAuthUser(account.id_token, account.provider);
        if (data) return { ...data };

        return null;
      }

      if (user) return { ...user };

      // not sign in and still hasn't expired
      if (Date.now() < (token as any).accessTokenExpires) return token;

      // access token expired
      return await getRefreshedTokenPair(token);
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken;

      session.error = token.error as any;
      return session;
    },
  },
});
