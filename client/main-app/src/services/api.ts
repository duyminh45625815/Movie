import axios from 'axios';
import { AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { auth } from "@/lib/auth";

/**
 * Custom error class for API-related errors.
 * @param {string} message - The error message.
 * @param {number} [statusCode] - The HTTP status code of the error.
 * @param {unknown} [response] - The response data from the API (if available).
 */
export class APIError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public response?: unknown
    ) {
        super(message);
        this.name = 'APIError';
    }
}


/**
 * List of public routes that do not require authentication.
 */
const PUBLIC_ROUTES = [
    '/auth/signin',
    '/auth/re-verify',
    '/user',
    '/auth/verify',
    '/auth/signUp',
    '/auth/signout',
    '/films/getFilms',
    '/films/getfilms/:id',
    '/showtime/FindOnetime/:id',
    'showtime/findAlltime',
    '/theaters/findtheater'
] as const;



/**
 * Checks if a given URL is a public route.
 * @param {string} url - The URL to check.
 * @returns {boolean} - True if the URL is a public route, otherwise false.
 */
const isPublicRoute = (url: string): boolean => {
    const normalizedUrl = url.replace(/^\/api/, '');
    return PUBLIC_ROUTES.some(route => {
        if (route.endsWith('*')) {
            const baseRoute = route.slice(0, -1);
            return normalizedUrl.startsWith(baseRoute);
        }
        if (route.includes(':')) {
            const routePattern = new RegExp('^' + route.replace(/:[^/]+/g, '([^/]+)') + '$');
            return routePattern.test(normalizedUrl);
        }
        return normalizedUrl === route;
    });
};




/**
 * Axios instance configured with a base URL and default headers.
 */
export const API: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});




/**
 * Fetches the authentication session for the current user.
 * @returns {Promise<Session | null>} - The session object or null if no session is found.
 */
const getAuthSession = async () => {
    try {
        if (typeof window !== 'undefined') {
            return await getSession();
        }
        return await auth();
    } catch (error) {
        console.error('Session fetch error:', error);
        return null;
    }
};







/**
 * Axios request interceptor to add authentication token to requests.
 * Skips adding the token for public routes.
 */
API.interceptors.request.use(
    async (config) => {
        // Skip auth for public routes
        if (isPublicRoute(config.url || '')) {
            return config;
        }
        if (config.headers?.Authorization) {
            return config;
        }
        const session = await getAuthSession();
        if (!session || !session.user || !session?.user.access_token) {
            throw new APIError('No authentication token found', 401);
        }
        else
            config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${session.user.access_token}`;
        return config;
    },
    (error) => Promise.reject(new APIError(error.message))
);









/**
 * Axios response interceptor to handle errors globally.
 * Automatically signs out the user if a 401 error is encountered.
 */
API.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
        const message = error.response?.data?.message || error.message;
        const statusCode = error.response?.status;

        if (statusCode == 401) {
            if (typeof window !== "undefined") {
                signOut({ redirect: true, callbackUrl: "/login" });
            }
        }
        throw new APIError(message, statusCode, error.response?.data);
    }
);






/**
 * Generic interface for API responses.
 * @template T - The type of the data returned by the API.
 */
interface ApiResponse<T> {
    data: T;
    message?: string;
}








/**
 * Fetches data from the specified endpoint.
 * @template T - The type of the data to be returned.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {Object} config - The request configuration (headers, params, etc.).
 * @returns {Promise<T>} - The data returned by the API.
 * @throws {APIError} - If the request fails.
 */
export const fetchData = async <T>(
    endpoint: string,
    config: { headers?: { Authorization?: string }; params?: Record<string, any> }
  ): Promise<T> => {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await API.get(endpoint, config);
      return response.data as T;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Lỗi khi lấy dữ liệu:", error.response?.data || error.message);
        throw new APIError(
          error.response?.data?.message || "Lỗi không xác định",
          error.response?.status || 500,
          error.response?.data
        );
      }
      console.error("Lỗi không xác định:", error);
      throw new APIError("Lỗi không xác định", 500);
    }
  };








  /**
 * Sends a POST request to the specified endpoint.
 * @template T - The type of the data to be returned.
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {Record<string, any>} data - The data to be sent in the request body.
 * @param {boolean} [requireAuth=true] - Whether the request requires authentication.
 * @returns {Promise<T>} - The data returned by the API.
 * @throws {APIError} - If the request fails.
 */
export const postData = async <T>(endpoint: string, data: Record<string, any>, requireAuth = true): Promise<T> => {
    try {
        const isFormdata =  data instanceof FormData;
        const config = {
            headers: {
                ...(requireAuth ? {} : { Authorization: '' }),
                ...(isFormdata ? { 'Content-Type': 'multipart/form-data' } : {}),  
            },
        };
        const response: AxiosResponse<ApiResponse<T>> = await API.post(endpoint, data, config);
        return response.data as T;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Lỗi khi gửi dữ liệu:', error.response.data.message);
        }
        throw error;
    }
};







/**
 * Sends a PATCH request to the specified endpoint.
 * @template T - The type of the data to be returned.
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {Record<string, any>} data - The data to be sent in the request body.
 * @param {boolean} [requireAuth=true] - Whether the request requires authentication.
 * @returns {Promise<T>} - The data returned by the API.
 * @throws {APIError} - If the request fails.
 */
export const patchData = async <T>(endpoint: string, data: Record<string, any>, requireAuth = true): Promise<T> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await API.patch(endpoint, data, {
            headers: {
                ...(requireAuth ? {} : { Authorization: '' }),
            },
        });
        return response.data as T;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Lỗi khi gửi dữ liệu:', error.response.data.message);
        }
        throw error;
    }
}








/**
 * Sends a DELETE request to the specified endpoint.
 * @template T - The type of the data to be returned.
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {boolean} [requireAuth=true] - Whether the request requires authentication.
 * @returns {Promise<T>} - The data returned by the API.
 * @throws {APIError} - If the request fails.
 */
export const deleteData = async <T>(endpoint: string, requireAuth = true): Promise<T> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await API.delete(endpoint, {
            headers: {
                ...(requireAuth ? {} : { Authorization: '' }),
            },
        });
        return response.data as T;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Lỗi khi xóa dữ liệu:', error.response.data.message);
        }
        throw error;
    }
};