import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// Define the type for credentials

export const authOption: any = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        // Check if email and password are provided
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        // Check if user exists with the provided email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // If user does not exist, return null
        if (!user) {
          return null;
        }

        // If user exists, check if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // If password does not match, return null
        if (!passwordMatch) {
          return null;
        }

        // If email and password match, return user
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/dashboard",
  },

  secret: process.env.NEXT_AUTH_SECRET,
  debug: process.env.NODE_ENV == "development",
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
