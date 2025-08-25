import { API_URL } from "@/constants";
import axios, { AxiosError } from "axios";

interface ServerError {
  message: string;
  Error: string;
}

export const login = async (email: string, password: string): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email, password
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ServerError>;
      console.error("Login error:", axiosError.response?.data);
      
      // Get the error message from the server response, or use a default message
      const errorMessage = axiosError.response?.data?.Error || 
                          axiosError.response?.data?.message ||
                          "An error occurred during login";
      throw new Error(errorMessage);
    }
    throw error; // Re-throw if it's not an Axios error
  }
}

export const register = async ({
  email,
  password,
  name,
  avatar
}: {
  email: string;
  password: string;
  name: string;
  avatar?: string | null;
}): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      email, password, name, avatar
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ServerError>;
      console.error("Registration error:", axiosError.response?.data);
      
      // Get the error message from the server response, or use a default message
      const errorMessage = axiosError.response?.data?.Error || 
                          axiosError.response?.data?.message ||
                          "An error occurred during registration";
      throw new Error(errorMessage);
    }
    throw error; // Re-throw if it's not an Axios error
  }
}