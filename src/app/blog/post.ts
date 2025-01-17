export interface Post {
    id: string;
    title: string;
    description: string;
    published_timestamp: string;
    cover_image: string;
    tags: string[];
    user: User;
}

interface User {
    name: string;
    username: string;
    profile_image_90: string;
}
