'use client';
import React, { useEffect, useState } from 'react';
import { getProductById, updateProduct, Product } from '@/app/services/productService';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/app/components/common/Button';
import Sidebar from '@/app/admin/Sidebar';

export default function EditProduct() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await getProductById(id as string);
                setProduct(data);
            } catch (err) {
                setError("Failed to fetch product details");
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    const handleUpdate = async () => {
        if (!product) return;
        try {
            await updateProduct(product.id, { price: product.price, stock: product.stock });
            alert("Product updated successfully!");
            router.push('/admin/products');
        } catch (err) {
            alert("Failed to update product");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8 ml-64">
                <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
                <div>
                    <label className="block">Price:</label>
                    <input
                        type="number"
                        value={product?.price}
                        onChange={(e) => {
                            if (product) {
                                setProduct({ ...product, price: parseFloat(e.target.value) });
                            }
                        }}
                        className="border p-2 w-full mb-4"
                    />
                    <label className="block">Stock:</label>
                    <input
                        type="number"
                        value={product?.stock}
                        onChange={(e) => {
                            if (product) {
                                setProduct({ ...product, stock: parseInt(e.target.value) });
                            }
                        }}
                        className="border p-2 w-full mb-4"
                    />
                    <Button onClick={handleUpdate} className="bg-blue-600">Update Product</Button>
                </div>
            </div>
        </div>
    );
}
