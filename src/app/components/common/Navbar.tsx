'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Logo / Branding */}
                <Link href="/customer/home" className="text-2xl font-bold">
                    EStore
                </Link>

                {/* Navigation Links */}
                <div className="flex space-x-6">
                    <Link href="/customer/home" className="hover:text-gray-200">Home</Link>
                    <Link href="/customer/wishlist" className="hover:text-gray-200">Wishlist</Link>
                </div>

                {/* User Info & Logout */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-sm">Hello, {user.name}</span>
                            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}