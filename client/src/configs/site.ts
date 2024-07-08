
const paths = {
  home: () => '/',
  login: () => '/login',
  notFound: () => '/404',
  findMatch: () => '/find-match',
  match: (id: string) => `/match/${id}`,
  matchTemplate: () => `/match/:matchId`,
  matchParent: () => `/match`,
  myProfile: () => `/my-profile`,
  profile: (id: string) => `/profile/${id}`,
  profileTemplate: () => `/profile/:profileId`,
  myMatches: () => `/my-matches`,
  play: () => '/play'
};

export const siteConfig = {
  paths,
}