'use client';

import {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";


function BlogPageList() {

    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function loadPosts() {

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

            <div className="px-4 mt-4"></div>
        </div>
    );
}

export default BlogPageList;
