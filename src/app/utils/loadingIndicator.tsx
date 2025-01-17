"use client";

export default function LoadingIndicator({message}: { message?: string }) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            {message && <p className="ml-4 text-xl">{message}</p>}
        </div>
    );
}
