const BASE_URL = "http://localhost:8000";

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/api/products`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
}

// Fetch a single product by ID
export async function getProductById(id: string): Promise<Product> {
    const response = await fetch(`${BASE_URL}/api/products/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch product details");
    }
    return response.json();
}

// Add a new product (Admin)
export async function addProduct(product: Omit<Product, "id">): Promise<Product> {
    const response = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error("Failed to add product");
    }
    return response.json();
}

// Update a product (Admin)
export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error("Failed to update product");
    }
    return response.json();
}

// Delete a product (Admin)
export async function deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, { method: "DELETE" });

    if (!response.ok) {
        throw new Error("Failed to delete product");
    }
}
