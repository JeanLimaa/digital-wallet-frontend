"use server';"
import axios, { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { getTokenCookie } from './auth';

export type ApiResponse<T> = {
    success?: T;
    error?: string;
};

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use(
    async (config) => {
        const token = await getTokenCookie();

        if (!token) {
            return config;
        }

        config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
);

export async function apiSafeCall<T>(
    promise: Promise<{ data: T }>,
    includeRevalidation: boolean = true
): Promise<ApiResponse<T>> {
    try {
        const {data} = await promise;
        includeRevalidation && revalidatePath('/wallet');
        return { success: data };
    } catch (err) {
        const error = err as AxiosError<any>;
        const message =
            Array.isArray(error.response?.data?.message)
                ? error.response?.data?.message[0]
                : error.response?.data?.message || 'Ocorreu algum erro inesperado';

        return { error: message };
    }
}

export default api;