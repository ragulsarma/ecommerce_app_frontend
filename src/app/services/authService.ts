export interface UserData {
  id: string;
  name: string;
  role: 'admin' | 'customer';
}

export interface AuthResponse {
  token: string;
  role: string;
  id: string;
  name: string;
}

  
const BASE_URL = "http://localhost:8000";
  
export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
      const response = await fetch(`${BASE_URL}/api/users/login`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
          throw new Error("Invalid credentials");
      }

      const data: AuthResponse = await response.json();
      return data;
  } catch (error:any) {
      throw new Error(error.message || "Login failed. Please try again.");
  }
}
