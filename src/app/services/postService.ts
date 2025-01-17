import {apiClient} from "@/app/services/apiClient";

const BASE_URL = 'https://dev.to/api/articles';

export async function fetchPosts(): Promise<never[]> {
    return apiClient(BASE_URL);
}

export async function fetchPostById(id: string | Array<string> | undefined): Promise<never> {
    return apiClient(`${BASE_URL}/${id}`);
}
