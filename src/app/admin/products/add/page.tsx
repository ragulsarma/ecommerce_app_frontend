'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct } from '@/app/services/productService';
import Button from '@/app/components/common/Button';
import Sidebar from '@/app/admin/Sidebar';

export default function AddProduct() {
    const router = useRouter();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!product.name || !product.price || !product.stock || !product.description) {
            setError('All fields are required.');
            return;
        }

        try {
            await addProduct({
                name: product.name,
                price: parseFloat(product.price),
                stock: parseInt(product.stock),
                description: product.description,
            });

            alert('Product added successfully!');
            router.push('/admin/products'); // Redirect to product list
        } catch (err) {
            setError('Failed to add product.');
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 ml-64">
                <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Product Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Stock:</label>
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Description:</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        ></textarea>
                    </div>

                    <Button type="submit" className="bg-blue-600">Add Product</Button>
                </form>
            </div>
        </div>
    );
}
