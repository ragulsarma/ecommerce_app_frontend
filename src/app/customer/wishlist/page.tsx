'use client';
import React from 'react';
import Navbar from '@/app/components/common/Navbar';

export default function WishlistPage() {
    return (
        <div>
            {/* ✅ Include Navbar at the top */}
            <Navbar />

            <div className="max-w-6xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
                <p>Feature coming soon...</p>
            </div>
        </div>
    );
}
