"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
interface NextAuthProviderProps {
  children: ReactNode;
  session: any;
}

const NextAuthProvider = ({ children, session }: NextAuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NextAuthProvider;
