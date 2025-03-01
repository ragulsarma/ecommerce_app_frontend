'use client';
import React, { useEffect, useState } from 'react';
import { getAllWishlists, WishlistItem } from '@/app/services/wishlistService';
import Sidebar from '@/app/admin/Sidebar';

export default function AdminWishlist() {
    const [wishlists, setWishlists] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchWishlists() {
            try {
                const data = await getAllWishlists();
                setWishlists(data);
            } catch (err) {
                setError("Failed to load wishlists.");
            } finally {
                setLoading(false);
            }
        }
        fetchWishlists();
    }, []);

    if (loading) return <p>Loading wishlists...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8 ml-64">
                <h1 className="text-2xl font-bold mb-4">All Wishlists</h1>

                {wishlists.length === 0 ? (
                    <p>No wishlists found.</p>
                ) : (
                    wishlists.map((wishlist) => (
                        <div key={wishlist.userId} className="border p-4 rounded shadow-md mb-4">
                            <h2 className="text-lg font-semibold">{wishlist.user.name} ({wishlist.user.email})</h2>
                            <ul className="mt-2">
                                {wishlist.products.map((product) => (
                                    <li key={product.id} className="border p-2 rounded shadow-sm">
                                        {product.name} - ${product.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
