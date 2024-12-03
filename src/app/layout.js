'use client'
import { SessionProvider } from 'next-auth/react';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}