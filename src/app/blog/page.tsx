'use client';

import {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {fetchPosts} from "@/app/services/postService";
import {Post} from "@/app/blog/post";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {withAuth} from "@/app/utils/withAuth";
import LoadingIndicator from "@/app/utils/loadingIndicator";


function BlogPageList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        async function loadPosts() {
            try {
                const data: Post[] = await fetchPosts();
                setPosts(data);
                setFilteredPosts(data);
            } catch (error) {
                console.error('Failed to load posts:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadPosts().then(() => {

        });
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(
                posts.filter((post: Post) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, posts]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        router.push('/');
    };

    if (isLoading) {
        return <LoadingIndicator message="Loading posts..."/>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-white p-4 shadow-md flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Blog Posts</h1>
                <button
                    onClick={handleLogout}
                    className="text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </header>

            {/* Search Bar */}
            <div className="sticky top-[64px] z-10 bg-white shadow px-4 py-3">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Posts */}
            <main className="px-4 py-6">
                {filteredPosts.length === 0 ? (
                    <p className="text-center text-gray-600">No posts found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPosts.map((post) => (
                            <a
                                key={post.id}
                                href={`/blog/${post.id}`}
                                className="block bg-white p-4 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
                            >
                                <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                            </a>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );

}

export default withAuth(BlogPageList);
