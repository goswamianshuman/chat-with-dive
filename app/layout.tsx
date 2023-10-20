import { AuthContextProvider } from "@/context/AuthContext";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AllUsersContextProvider } from "@/context/AllUsersContext";

export const metadata: Metadata = {
  title: "Chat with Dive",
  description: "one to one chat app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <AllUsersContextProvider>{children}</AllUsersContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
