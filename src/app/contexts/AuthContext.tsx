'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuthData, saveAuthData, clearAuthData } from '@/app/utils/auth';
import { useRouter } from 'next/navigation';
import { AuthResponse } from '@/app/services/authService';

interface AuthContextType {
  user: AuthResponse | null;
  login: (userData: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Ensure this only runs on the client
    if (typeof window !== 'undefined') {
      const authData = getAuthData();
      if (authData) {
        setUser(authData);
      }
      setLoading(false);
    }
  }, []);

  const login = (userData: AuthResponse) => {
    saveAuthData(userData);
    setUser(userData);
    const normalizedRole = userData.role.toLowerCase();
    console.log("Normalized Role:", normalizedRole); // ✅ Debugging log


    if (normalizedRole === 'admin') {
      console.log("Admin login redirection")
      router.push('/admin/dashboard');
    } else {
      console.log(" login redirection")
      router.push('/customer/home');
    }
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role.toLowerCase() === 'admin',
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
