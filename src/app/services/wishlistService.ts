
const BASE_URL = "http://localhost:8000/api/wishlist";

export interface WishlistItem {
    userId: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    products: {
        id: string;
        name: string;
        price: number;
    }[];
}

// Fetch wishlist by User ID (Customer)
export async function getUserWishlist(userId: string): Promise<WishlistItem | null> {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}`, { method: "GET" });
        if (!response.ok) throw new Error("Failed to fetch wishlist.");
        return response.json();
    } catch (error) {
        console.error("Error fetching user wishlist:", error);
        return null;
    }
}

// Add product to wishlist
export async function addToWishlist(userId: string, productId: string): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, productId }),
        });
        if (!response.ok) throw new Error("Failed to add to wishlist.");
    } catch (error) {
        console.error("Error adding to wishlist:", error);
    }
}

// Remove product from wishlist (Using DELETE method with body payload)
export async function removeFromWishlist(userId: string, productId: string): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, productId }),
        });
        if (!response.ok) throw new Error("Failed to remove from wishlist.");
    } catch (error) {
        console.error("Error removing from wishlist:", error);
    }
}

// Fetch all wishlists (Admin)
export async function getAllWishlists(): Promise<WishlistItem[]> {
    try {
        const response = await fetch(`${BASE_URL}`, { method: "GET" });
        if (!response.ok) throw new Error("Failed to fetch wishlists.");
        return response.json();
    } catch (error) {
        console.error("Error fetching wishlists:", error);
        throw error;
    }
}