'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import Button from '@/app/components/common/Button';

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">E-Commerce Store</h1>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span>Welcome, {user?.name}</span>
                <Button onClick={logout} className="bg-red-600 hover:bg-red-700">
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome to our E-Commerce Store</h2>
              <p className="mb-6">This is the customer-facing homepage.</p>
              {!isAuthenticated && (
                <Link href="/login">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}