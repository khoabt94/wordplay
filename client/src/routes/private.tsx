import { siteConfig } from '@/configs/site';
import FindMatchPage from '@/pages/find/page';
import HomePage from '@/pages/home';
import MatchPage from '@/pages/match';
import MyProfilePage from '@/pages/my-profile';

export const privateRoutes = [
  {
    path: siteConfig.paths.home(),
    element: <HomePage />,
  },
  {
    path: siteConfig.paths.findMatch(),
    element: <FindMatchPage />,
  },
  {
    path: siteConfig.paths.matchTemplate(),
    element: <MatchPage />,
  },
  {
    path: siteConfig.paths.myProfile(),
    element: <MyProfilePage />,
  },
];