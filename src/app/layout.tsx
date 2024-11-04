'use client';

import { Inter } from "next/font/google";
import { ThemeProvider } from '@/components/blocks/theme-provider'
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
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <ClerkProvider>
          <RecoidContextProvider>
            {children}
            <Toaster />
          </RecoidContextProvider>
        </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}