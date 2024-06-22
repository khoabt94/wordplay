import { siteConfig } from '@/configs/site';
import { useAuthStore } from '@/stores';
import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: React.PropsWithChildren) {
    const { user, isFetchingUser } = useAuthStore();

    if (!isFetchingUser && !user) {
        return <Navigate to={siteConfig.paths.login()} />;
    }

    return children;
}