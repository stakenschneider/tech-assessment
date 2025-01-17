export async function apiClient<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        const response: Response = await fetch(url, options);

        if (!response.ok) {
            const errorMessage = `API error: ${response.status} ${response.statusText}`;
            console.error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error('Network error:', error);
        throw new Error('Network error. Please check your connection or try again later.');
    }
}
