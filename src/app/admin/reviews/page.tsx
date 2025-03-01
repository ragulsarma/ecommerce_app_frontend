'use client';
import React, { useEffect, useState } from 'react';
import { getAllReviews, replyToReview, Review } from '@/app/services/reviewService';
import Sidebar from '@/app/admin/Sidebar';
import Button from '@/app/components/common/Button';

export default function AdminReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAllReviews();
                setReviews(data);
            } catch (err) {
                setError("Failed to load reviews.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleReplyChange = (reviewId: string, value: string) => {
        setReplyInputs({ ...replyInputs, [reviewId]: value });
    };

    const handleReplySubmit = async (reviewId: string) => {
        try {
            await replyToReview(reviewId, replyInputs[reviewId]);
            setReviews(reviews.map((review) =>
                review.id === reviewId ? { ...review, reply: replyInputs[reviewId] } : review
            ));
            setReplyInputs({ ...replyInputs, [reviewId]: "" });
        } catch (error) {
            alert("Failed to submit reply.");
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 ml-64">
                <h1 className="text-2xl font-bold mb-4">Manage Reviews</h1>

                {loading ? (
                    <p>Loading reviews...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 p-2 text-blue-600">Rating</th>
                                <th className="border border-gray-300 p-2 text-blue-600">Comment</th>
                                <th className="border border-gray-300 p-2 text-blue-600">Reply</th>
                                <th className="border border-gray-300 p-2 text-blue-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review.id} className="text-center">
                                    <td className="border border-gray-300 p-2">{"⭐".repeat(review.rating)}</td>
                                    <td className="border border-gray-300 p-2">{review.comment}</td>
                                    <td className="border border-gray-300 p-2">
                                        {review.reply ? (
                                            <span className="text-green-600">{review.reply}</span>
                                        ) : (
                                            <input
                                                type="text"
                                                placeholder="Write a reply..."
                                                value={replyInputs[review.id] || ""}
                                                onChange={(e) => handleReplyChange(review.id, e.target.value)}
                                                className="border p-1 rounded w-full"
                                            />
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {!review.reply && (
                                            <Button
                                                onClick={() => handleReplySubmit(review.id)}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                Submit Reply
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
