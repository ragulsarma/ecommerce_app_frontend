'use client';
import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, Product } from '@/app/services/productService';
import Button from '@/app/components/common/Button';
import Link from 'next/link';
import Sidebar from '@/app/admin/Sidebar';
import { useRouter } from 'next/navigation';

export default function AdminProducts() {
    const router = useRouter();
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

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((product) => product.id !== id));
            alert("Product deleted successfully!");
        } catch (err) {
            alert("Failed to delete product");
        }
    };

    // Pagination Logic
    const totalPages = Math.ceil(products.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const displayedProducts = products.slice(startIndex, startIndex + pageSize);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 ml-64">
                <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

                {/* Add Product Button */}
                <div className="flex justify-end mb-4">
                    <Button onClick={() => router.push('/admin/products/add')} className="bg-green-600">
                        Add Product
                    </Button>
                </div>

                {/* Product Table */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Price</th>
                            <th className="border border-gray-300 p-2">Stock</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedProducts.map((product) => (
                            <tr key={product.id} className="text-center">
                                <td className="border border-gray-300 p-2">{product.name}</td>
                                <td className="border border-gray-300 p-2">${product.price}</td>
                                <td className="border border-gray-300 p-2">{product.stock}</td>
                                <td className="border border-gray-300 p-2">
                                    {/* Edit Button */}
                                    <Button
                                        onClick={() => router.push(`/admin/products/edit/${product.id}`)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2"
                                    >
                                        Edit
                                    </Button>
                                    
                                    {/* Delete Button */}
                                    <Button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                    {/* Left Side - Page Size Selector */}
                    <div className="flex items-center">
                        <label className="mr-2 font-semibold">Page Size:</label>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border p-2 rounded"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    {/* Page Number Display */}
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    {/* Right Side - Next & Previous Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                        >
                            Previous
                        </button>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
