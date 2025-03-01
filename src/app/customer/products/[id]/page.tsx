'use client';
import React, { useEffect, useState } from 'react';
import { getProductById } from '@/app/services/productService';
import { getReviewsByProductId, addReview, Review } from '@/app/services/reviewService';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import Button from '@/app/components/common/Button';
import Navbar from '@/app/components/common/Navbar';
import { addToWishlist, removeFromWishlist } from '@/app/services/wishlistService';
interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
}

export default function ProductDetailPage() {
    const { id } = useParams(); // Get product ID from URL
    const { user } = useAuth(); // Get logged-in user info
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [userReview, setUserReview] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); // ✅ Track hover state
    const [hasUserReviewed, setHasUserReviewed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const productData = await getProductById(id as string);
                setProduct(productData);

                const reviewData = await getReviewsByProductId(id as string);
                setReviews(reviewData);

                if (user) {
                    const userExistingReview = reviewData.find(review => review.userId === user.id);
                    if (userExistingReview) {
                        setHasUserReviewed(true);
                        setUserReview(userExistingReview.comment);
                        setRating(userExistingReview.rating);
                    }
                }
            } catch (err) {
                setError("Failed to load product details.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id, user]);

    const handleWishlistToggle = async () => {
        if (!user) {
            alert("Please log in to manage your wishlist.");
            return;
        }

        if (wishlist.includes(id as string)) {
            await removeFromWishlist(user.id, id as string);
            setWishlist(wishlist.filter((prodId) => prodId !== id)); // Remove from UI
        } else {
            await addToWishlist(user.id, id as string);
            setWishlist([...wishlist, id as string]); // Add to UI
        }
    };


    const handleSubmitReview = async () => {
        if (!user) {
            alert("You need to be logged in to leave a review.");
            return;
        }
        if (!userReview.trim() || rating === 0) {
            alert("Please provide a rating and review.");
            return;
        }

        try {
            const newReview = await addReview(id as string, user.id, rating, userReview);
            setReviews([...reviews, newReview]);
            setHasUserReviewed(true);
        } catch (err) {
            alert("Failed to submit review.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto py-8">
                {/* Product Details */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
                    {/* Wishlist Button */}
                    <button onClick={handleWishlistToggle}>
                        {wishlist.includes(id as string) ? (
                            <span className="text-red-600 text-2xl">❤️</span>
                        ) : (
                            <span className="text-gray-400 text-2xl">🤍</span>
                        )}
                    </button>
                </div>
                <p>{product?.description}</p>
                <p className="text-lg font-semibold">${product?.price}</p>
                <p>Stock: {product?.stock}</p>

                {/* Reviews Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold">Customer Reviews</h2>

                    {reviews.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        <ul className="mt-2 space-y-4">
                            {reviews.map((review) => (
                                <li key={review.id} className="border p-4 rounded shadow-md">
                                    {/* Rating */}
                                    <div className="flex items-center mb-2">
                                        <span className="font-semibold">Rating: </span>
                                        <div className="ml-2">
                                            {"⭐".repeat(review.rating)}
                                        </div>
                                    </div>

                                    {/* Comment */}
                                    <p className="text-gray-800 italic">{review.comment}</p>

                                    {/* Admin Reply (Optional) */}
                                    {review.reply && (
                                        <p className="text-blue-600 mt-2">Admin Reply: {review.reply}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Add Review (Only if user hasn't reviewed yet) */}
                    {!hasUserReviewed ? (
                        <div className="mt-4">
                            <h3 className="font-semibold">Leave a Review:</h3>

                            {/* Rating Selector */}
                            <div className="flex items-center mt-2">
                                <label className="mr-2 font-semibold">Rating:</label>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onMouseEnter={() => setHoverRating(star)} // Hover effect
                                        onMouseLeave={() => setHoverRating(0)} // Reset hover
                                        onClick={() => setRating(star)} // Select rating
                                        className={`cursor-pointer text-xl transition ${hoverRating >= star
                                                ? "text-green-500" // ✅ Hover turns green
                                                : rating >= star
                                                    ? "text-yellow-500" // ✅ Selected stays yellow
                                                    : "text-gray-400"
                                            }`}
                                    >
                                        ⭐
                                    </span>
                                ))}
                            </div>


                            {/* Review Input */}
                            <textarea
                                className="border p-2 w-full mt-2"
                                placeholder="Write your review..."
                                value={userReview}
                                onChange={(e) => setUserReview(e.target.value)}
                            ></textarea>
                            <Button onClick={handleSubmitReview} className="mt-2 bg-blue-600">
                                Submit Review
                            </Button>
                        </div>
                    ) : (
                        <p className="mt-4 text-gray-600">You have already submitted a review for this product.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
