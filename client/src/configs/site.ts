
const paths = {
  home: () => '/',
  login: () => '/login',
  notFound: () => '/404',
  findMatch: () => '/find-match',
  match: (id: string) => `/match/${id}`,
  matchTemplate: () => `/match/:matchId`,
  matchParent: () => `/match`,
  myProfile: () => `/my-profile`,
  myMatches: () => `/my-matches`,
  play: () => '/play'
};

export const siteConfig = {
  paths,
}