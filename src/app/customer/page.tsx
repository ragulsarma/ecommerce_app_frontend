'use client';
import React, { useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist } from '@/app/services/wishlistService';
import { useAuth } from '@/app/contexts/AuthContext';
import Navbar from '@/app/components/common/Navbar';

export default function WishlistPage() {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        async function fetchWishlist() {
            if (user) {
                const wishlistData:any = await getWishlist(user.id);
                setWishlist(wishlistData);
            }
        }
        fetchWishlist();
    }, [user]);

    const handleRemove = async (productId:string) => {
        if (user) {
            await removeFromWishlist(user.id, productId);
            setWishlist(wishlist.filter((item:any )=> item?.productId !== productId));
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <p>No items in your wishlist.</p>
                ) : (
                    <div className="grid grid-cols-3 gap-6">
                        {wishlist.map((item:any) => (
                            <div key={item?.productId} className="border p-4 rounded shadow-md flex justify-between">
                                <p>Product ID: {item?.productId}</p>
                                <button
                                    onClick={() => handleRemove(item?.productId)}
                                    className="text-red-600 font-semibold"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
