'use client';
import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        console.log("User not authenticated, redirecting to /login");
        router.push('/login');
      } else if (adminOnly && !isAdmin) {
        console.log("User is not admin, redirecting to /customer/home");
        router.push('/customer/home');
      } else {
        console.log("Access granted to:", adminOnly ? "Admin Page" : "User Page");
      }
    }
  }, [loading, isAuthenticated, isAdmin, router, adminOnly]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated || (adminOnly && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
}
