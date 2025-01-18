'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Post} from '@/app/blog/post';
import {useParams} from 'next/navigation';
import {fetchPostById} from "@/app/services/postService";
import {withAuth} from "@/app/utils/withAuth";
import LoadingIndicator from "@/app/utils/loadingIndicator";
import Image from "next/image";


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
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <header className="mb-6">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800">{post.title}</h1>
                <p className="text-gray-600 mt-2">{post.description}</p>
            </header>

            <div className="my-6">
                <Image
                    width={1000}
                    height={600}
                    layout="intrinsic"
                    src={post.social_image}
                    alt={`Image for ${post.title}`}
                    className="rounded-lg shadow-md"
                />
            </div>

            {/* Tags */}
            <section className="flex flex-wrap items-center my-4 gap-2">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-blue-200 text-blue-800 px-3 py-1 text-sm rounded-full shadow-sm"
                    >
                    #{tag}
                </span>
                ))}
            </section>

            {/* Author Section */}
            <footer className="flex items-center mt-8 bg-white shadow-md p-4 rounded-lg">
                <Image
                    width={50}
                    height={50}
                    src={post.user.profile_image_90}
                    alt={`Profile image of ${post.user.name}`}
                    className="rounded-full"
                />
                <div className="ml-4">
                    <p className="text-gray-800 font-semibold">{post.user.username}</p>
                    <p className="text-gray-600 text-sm">
                        Published on {new Date(post.published_timestamp).toLocaleDateString()}
                    </p>
                </div>
            </footer>

            <Link
                href="/blog"
                className="mt-12 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition"
            >
                Back to Blog
            </Link>
        </div>
    );

}

export default withAuth(BlogPost);
