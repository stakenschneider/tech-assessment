'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Post} from '@/app/blog/post';
import {useParams} from 'next/navigation';
import {fetchPostById} from "@/app/services/postService";

function BlogPost() {
    const {id} = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        async function loadPost() {
            try {
                const data = await fetchPostById(id);
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            }
        }

        loadPost().then(() => {
        });
    }, [id]);

    if (!post) {
        return <p>Post not found</p>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div>{post.description}</div>

            <Link href="/blog"
                  className="mt-12 px-4 py-2 inline-block bg-blue-800 hover:bg-blue-950 text-white rounded-full">
                Back to Blog
            </Link>
        </div>
    );
}

export default BlogPost;
