const BASE_URL = "http://localhost:8000/api/wishlist";

export interface WishlistItem {
    id: string;
    productId: string;
    userId: string;
}

// Fetch Wishlist Items
export async function getWishlist(userId: string): Promise<WishlistItem[]> {
    try {
        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        throw new Error("Failed to fetch wishlist.");
    }
}

// Add to Wishlist
export async function addToWishlist(userId: string, productId: string): Promise<void> {
    try {
        await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, productId }),
        });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        throw new Error("Failed to add to wishlist.");
    }
}

// Remove from Wishlist
export async function removeFromWishlist(userId: string, productId: string): Promise<void> {
    try {
        await fetch(`${BASE_URL}/${userId}/${productId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        throw new Error("Failed to remove from wishlist.");
    }
}
