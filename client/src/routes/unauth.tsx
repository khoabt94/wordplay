import { siteConfig } from '@/configs/site';
import LoginPage from '@/pages/login';

export const unauthRoutes = [
  {
    path: siteConfig.paths.login(),
    element: <LoginPage />,
  }
];