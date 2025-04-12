import NextAuth, { DefaultSession, CredentialsSignin, User } from "next-auth";
import { APIError } from "@/services/api";
import { postData, fetchData } from "@/services/api";
import Credentials from "next-auth/providers/credentials";
import  "next-auth/jwt";


export class InvalidCredentials extends CredentialsSignin {
    code: string;
    constructor(error: string) {
      super(); 
      this.code = error; 
    }
  }

  class UserNotFound extends CredentialsSignin {
    code = "User_not_found";
  }


declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    access_token: string|null;
    role: string;
  }
}

interface UserType  {
    _id: string,
    email: string,
    role:string,
    firstName: string,
    lastName: string,
    isActive: boolean,
    createdAt: Date
    updatedAt: Date
    __v: number
}

declare module "next-auth" {
    interface User {
      access_token: string|null;
      exp: number;
      role: string;
    }
    interface Session {
      user: User & DefaultSession["user"];
    }
  }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Vui lòng nhập đầy đủ thông tin.");
        }
        try {
          const response = await postData<User>("/auth/signin", {
            username: credentials.username,
            password: credentials.password,
          });

          if (!response?.access_token) {
            throw new Error("Không nhận được token xác thực.");
          }
      

          const user = await fetchData<UserType>("/auth/me", {
            headers: { Authorization: `Bearer ${response.access_token}` },
          });
          if(!user) throw new UserNotFound();
          return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            access_token: response.access_token,
            exp: response.exp, 
          };
        } catch (error) {
            if (error instanceof APIError) {
                throw new InvalidCredentials(error.message);
              }
              throw new InvalidCredentials(error as string);
            }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized:async ({auth})=>{
      return !!auth;
    },
    session: ({ session, token }) => {
       if (token.exp && token.exp*1000-30000 < Date.now()) {
        console.log("Token expired, logging out...");
        signOut(); 
        return session;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub!,
          access_token: token.access_token || null,
          exp: token.exp!,
          role: token.role, 
        },
      };
    },
  
    async jwt ({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.access_token = user.access_token;
        token.exp = user.exp;
        token.role = user.role; 
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt",maxAge: 60 * 60, },
});