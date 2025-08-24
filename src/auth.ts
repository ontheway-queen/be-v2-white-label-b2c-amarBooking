import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { API_ENDPOINTS } from './lib/APIs/endpoint-list';
import { baseURL } from './request';
import { ILoginResponse } from './type/type';
import { TWO_FA_ERROR_MESSAGE } from './lib/CONSTANT';
import { SITE_INFO } from './site-config';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      email?: string;
      name?: string;
      backendToken?: string;
      gender?: string;
      photo?: string | null;
      status?: boolean;
      username?: string;
      two_fa?: boolean;
    };
  }

  interface User {
    id?: string;
    email?: string;
    name?: string;
    backendToken?: string;
    gender?: string;
    photo?: string | null;
    status?: boolean;
    username?: string;
    two_fa?: boolean;
  }
}

class InvalidLoginError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        id: { label: 'Id', type: 'text' },
        username: { label: 'Username', type: 'text' },
        name: { label: 'Name', type: 'text' },
        two_fa: { label: 'Two_fa', type: 'text' },
        status: { label: 'Status', type: 'text' },
        photo: { label: 'Photo', type: 'text' },
        gender: { label: 'Gender', type: 'text' },
        token: { label: 'Token', type: 'text' },
      },
      authorize: async (credentials) => {
        const { token, email, password, gender, id, name, photo, status, two_fa, username } =
          credentials ?? {};

        // 🔐 If token is already provided, skip API call and assume user is authenticated
        if (token) {
          return {
            id: String(id),
            email: email as string,
            name: (name as string) || (username as string),
            backendToken: token as string,
            gender: gender as string,
            photo: photo as string,
            status: status as boolean,
            username: username as string,
            two_fa: two_fa as boolean,
          };
        }

        // 🔁 If no token, fall back to API login
        if (!email || !password) {
          throw new Error('Missing email or password');
        }

        const response = await fetch(`${baseURL}/${API_ENDPOINTS.LOGIN}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: SITE_INFO.token,
          },
          body: JSON.stringify({
            user_or_email: email,
            password,
          }),
          credentials: 'include',
        });

        let data;

        try {
          data = (await response.json()) as ILoginResponse;
        } catch {
          throw new InvalidLoginError('Invalid response from server');
        }

        if (!response.ok || !data.success) {
          throw new InvalidLoginError(data?.message || 'Invalid identifier or password');
        }

        // Check if two factor authentication is required

        if (data?.data?.two_fa === true) {
          throw new InvalidLoginError(TWO_FA_ERROR_MESSAGE);
        }

        const user = data.data;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name || user.username,
          backendToken: data.token,
          gender: user.gender,
          photo: user.photo,
          status: user.status,
          username: user.username,
          two_fa: user.two_fa,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 3600,
    updateAge: 3600,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const isUpdate = trigger === 'update';

      if (isUpdate && session?.updateImageUrl) {
        token.picture = session.updateImageUrl;
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.backendToken = user.backendToken;
        token.gender = user.gender;
        token.status = user.status;
        token.username = user.username;
        token.two_fa = user.two_fa;
        token.photo = user.photo;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          backendToken: token.backendToken as string,
          gender: token.gender as string,
          status: token.status as boolean,
          username: token.username as string,
          two_fa: token.two_fa as boolean,
          photo: token.photo as string | null,
        };
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  cookies: {
    sessionToken: {
      options: {
        maxAge: 3600,
      },
    },
  },
});
