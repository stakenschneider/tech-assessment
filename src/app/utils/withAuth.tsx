'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import React from 'react';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
    return function AuthenticatedComponent(props: T) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const router: AppRouterInstance = useRouter();

        useEffect(() => {
            const auth: string | null = localStorage.getItem('isAuthenticated');
            if (auth === 'true') {
                setIsAuthenticated(true);
            } else {
                router.push('/');
            }
        }, [router]);

        if (!isAuthenticated) {
            return null;
        }

        return <Component {...props} />;
    };
}
