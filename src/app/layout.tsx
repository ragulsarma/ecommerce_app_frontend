import React from 'react';
import './globals.css';
import { AuthProvider } from '@/app/contexts/AuthContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-Commerce App',
  description: 'A Next.js E-Commerce application',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
