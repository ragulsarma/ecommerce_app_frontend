'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      // Redirect based on role
      if (user?.role === 'Admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/customer/home');
      }
    }
  }, [isAuthenticated, user, router]);

  return null; 
}
