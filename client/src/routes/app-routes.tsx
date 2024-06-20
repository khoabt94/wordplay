import { RouteObject, useRoutes } from 'react-router-dom';
import { unauthRoutes } from './unauth';
import { privateRoutes } from './private';
import { ProtectedRoute } from '@/components/common/protected-route';
import { UnauthRoute } from '@/components/common/unauth-route';
import { RootLayout } from '@/components/common/layout';

type Route = {
  path: string;
  element: JSX.Element;
};


export function AppRoutes() {
  const parseRouteObjects = (
    routes: Route[],
    isPrivate: boolean = false
  ): RouteObject[] => {
    return routes.map((route) => ({
      path: route.path,
      element: isPrivate ? (
        <ProtectedRoute>{route.element}</ProtectedRoute>
      ) : (
        <UnauthRoute>{route.element}</UnauthRoute>
      ),
    }));
  };

  const unauthRouteObjects = parseRouteObjects(unauthRoutes);
  const privateRouteObjects = parseRouteObjects(privateRoutes, true);

  const routes = [
    ...unauthRouteObjects,
    ...privateRouteObjects,
  ];

  const allRoutes = useRoutes(routes);

  return <RootLayout>{allRoutes}</RootLayout>;
}