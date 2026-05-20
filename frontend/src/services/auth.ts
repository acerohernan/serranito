import api from "./api";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  lastname: string;
  firstname: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  token?: string;
}


export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },
};
