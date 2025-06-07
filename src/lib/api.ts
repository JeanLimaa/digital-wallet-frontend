import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

type ApiResponse<T> = {
    success?: T;
    error?: string;
};

const cookieHeader = cookies().toString();

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
    },
});

export async function apiSafeCall<T>(
    promise: Promise<{ data: T }>
): Promise<ApiResponse<T>> {
    try {
        const {data} = await promise;
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