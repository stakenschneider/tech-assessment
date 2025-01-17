'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Post} from '@/app/blog/post';
import {useParams} from 'next/navigation';
import {fetchPostById} from "@/app/services/postService";
import {withAuth} from "@/app/utils/withAuth";
import LoadingIndicator from "@/app/utils/loadingIndicator";

function BlogPost() {
    const {id} = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadPost() {
            try {
                const data = await fetchPostById(id);
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadPost().then(() => {
        });
    }, [id]);

    if (!post) {
        return <p className="flex items-center justify-center h-screen">Post not found</p>;
    }

    if (isLoading) {
        return <LoadingIndicator message="Loading post..."/>;
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

export default withAuth(BlogPost);
