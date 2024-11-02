'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"
import RecoidContextProvider from "./recoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <RecoidContextProvider>
            {children}
            <Toaster />
          </RecoidContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}