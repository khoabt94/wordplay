import { siteConfig } from '@/configs/site';
import { useAuthStore } from '@/stores';
import React from 'react';
import { Navigate } from 'react-router-dom';

export function UnauthRoute({ children }: React.PropsWithChildren) {
    const { user, isFetchingUser } = useAuthStore();

    if (user && !isFetchingUser) {
        return <Navigate to={siteConfig.paths.home()} />;
    }

    return children;
}