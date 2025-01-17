import {apiClient} from "@/app/services/apiClient";
import {Post} from "@/app/blog/post";

const BASE_URL = 'https://dev.to/api/articles';

export async function fetchPosts(): Promise<Post[]> {
    return apiClient(BASE_URL);
}

export async function fetchPostById(id: string | Array<string> | undefined): Promise<Post> {
    return apiClient(`${BASE_URL}/${id}`);
}
