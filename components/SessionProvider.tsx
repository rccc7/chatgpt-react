"use client";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

type Props = {
  // Here, children will be the component which this SessionProvider will wrap. In this case
  // the body inside layout.tsx
  children: React.ReactNode;
  session: Session | null;
};

export function SessionProvider({ children, session }: Props) {
  return <Provider>{children}</Provider>;
}
