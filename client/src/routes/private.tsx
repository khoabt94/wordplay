import { siteConfig } from '@/configs/site';
import FindMatchPage from '@/pages/find/page';
import HomePage from '@/pages/home';

export const privateRoutes = [
  {
    path: siteConfig.paths.home(),
    element: <HomePage />,
  },
  {
    path: siteConfig.paths.findMatch(),
    element: <FindMatchPage />,
  },
];