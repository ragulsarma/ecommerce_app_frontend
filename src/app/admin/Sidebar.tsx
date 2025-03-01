'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Sidebar() {
    const { logout } = useAuth();

    return (
        <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col justify-between p-4 fixed">
            {/* Navigation Links */}
            <div>
                <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
                <ul className="space-y-4">
                    <li>
                        <Link href="/admin/products" className="block py-2 px-4 hover:bg-gray-700 rounded">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/reviews" className="block py-2 px-4 hover:bg-gray-700 rounded">
                            Reviews
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/wishlist" className="block py-2 px-4 hover:bg-gray-700 rounded">
                            Wishlist
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Logout Button at Bottom */}
            <button
                onClick={logout}
                className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
            >
                Logout
            </button>
        </aside>
    );
}
