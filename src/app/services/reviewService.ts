const BASE_URL = "http://localhost:8000";

export interface Review {
    id: string;
    rating: number;
    comment: string;
    reply?: string; // Optional response from admin
    userId: string;
    productId: string;
    createdAt: string;
}

// Fetch all reviews
export async function getAllReviews(): Promise<Review[]> {
    try {
        const response = await fetch(`${BASE_URL}/api/reviews`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw new Error("Failed to fetch reviews.");
    }
}

// Reply to a review
export async function replyToReview(reviewId: string, reply: string): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/api/reviews/${reviewId}/reply`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        console.log("Reply added successfully");
    } catch (error) {
        console.error("Error replying to review:", error);
        throw new Error("Failed to submit reply.");
    }
}


// Fetch reviews for a product
export async function getReviewsByProductId(productId: string): Promise<Review[]> {
    try {
        const response = await fetch(`${BASE_URL}/api/reviews/product/${productId}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Invalid review data received.");
        }
        return data;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw new Error("Failed to fetch reviews.");
    }
}

// Add a new review for a product
export async function addReview(productId: string, userId: string, rating: number, comment: string): Promise<Review> {
    try {
        const response = await fetch(`${BASE_URL}/api/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, userId, rating, comment }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error adding review:", error);
        throw new Error("Failed to add review.");
    }
}