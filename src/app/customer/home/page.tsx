'use client';
import React, { useEffect, useState } from 'react';
import { getProducts, Product } from '@/app/services/productService';
import Navbar from '@/app/components/common/Navbar';
import Link from 'next/link';

export default function CustomerHomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Default page size

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load products");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Calculate pagination
    const totalPages = Math.ceil(products.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const displayedProducts = products.slice(startIndex, startIndex + pageSize);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">Product List</h1>

                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : displayedProducts.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    <div>
                        {/* Product List */}
                        <div className="grid grid-cols-3 gap-6">
                            {displayedProducts.map((product) => (
                                <Link key={product.id} href={`/customer/products/${product.id}`}>
                                    <div className="border p-4 rounded shadow-md cursor-pointer hover:bg-gray-100">
                                        <h2 className="text-lg font-bold">{product.name}</h2>
                                        <p>{product.description}</p>
                                        <p className="font-semibold">${product.price}</p>
                                        <p>Stock: {product.stock}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4">
                            {/* Previous Button (Left Side) */}
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                            >
                                Previous
                            </button>

                            {/* Page Number (Centered) */}
                            <div className="text-center flex-1">
                                Page {currentPage} of {totalPages}
                            </div>

                            {/* Page Size Selector (Left of Next Button) */}
                            <div className="flex items-center">
                                <label className="mr-2 font-semibold">Page Size:</label>
                                <select
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                        setCurrentPage(1); // Reset to first page on size change
                                    }}
                                    className="border p-2 rounded"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>

                            {/* Next Button (Right Side) */}
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}