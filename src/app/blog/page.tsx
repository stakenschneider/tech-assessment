'use client';

import {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {fetchPosts} from "@/app/services/postService";
import {Post} from "@/app/blog/post";


function BlogPageList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await fetchPosts();
                setPosts(data);
            } catch (error) {
                console.error('Failed to load posts:', error);
            }
        }

        loadPosts().then(() => {

        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        router.push('/');
    };

    return (
        <div>
            <div className="sticky top-0 z-20 bg-white p-4 flex justify-between align-middle">
                <h1 className="text-3xl font-bold">Blog Posts</h1>

                <button
                    onClick={handleLogout}
                    className="text-sm px-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            <div className="sticky top-[64px] z-10 bg-white shadow-md px-4 py-2">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full"
                />
            </div>

            <div className="px-4 mt-4">
                <div className="columns-3xs">

                    {posts.map((post) => (
                        <a key={post.id}
                           href={`/blog/${post.id}`}>
                            <div
                                className="text-black mb-4 mr-4 p-2 w-full cursor-pointer bg-amber-50 rounded shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                                {post.title}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BlogPageList;
