
const paths = {
  home: () => '/',
  login: () => '/login',
  notFound: () => '/404',
  findMatch: () => '/find-match',
  match: (id: string) => `/match/${id}`,
  matchTemplate: () => `/match/:matchId`,
  play: () => '/play'
};

export const siteConfig = {
  paths,
}