'use client';
import React from 'react';
import ProtectedRoute from '@/app/components/layouts/ProtectedRoute';
import { useAuth } from '@/app/contexts/AuthContext';
import Button from '@/app/components/common/Button';
import Link from 'next/link';
import Sidebar from '@/app/admin/Sidebar';

export default function AdminDashboard() {
    const { logout } = useAuth();

    return (
        <ProtectedRoute adminOnly>
            <div className="flex">
                {/* ✅ Sidebar */}
                <Sidebar />

                {/* ✅ Main Content */}
                <div className="flex-1 p-8 ml-64">
                    <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <Link href="/admin/products">
                            <Button className="bg-blue-600">Manage Products</Button>
                        </Link>
                        <Button onClick={logout} className="bg-red-600">Logout</Button>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}