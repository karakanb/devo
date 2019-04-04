const MINUTE = 60000;
const DEFAULT_NIGHTMODE_BACKGROUND = '31363e';

export default {
  settings: {
    nightMode: {
      backgroundColor: DEFAULT_NIGHTMODE_BACKGROUND,
    },
  },
  platforms: {
    github: {
      title: 'GitHub Trending',
      icon: ['fab', 'github'],

      titleFontColor: 'ffffff',
      titleBackgroundColor: '25292f',
      loadingColor: '25292f',

      externalLink: 'https://github.com/trending',
      bodyComponentName: 'GitHubBody',
      updatedAtThreshold: 5 * MINUTE,

      nightMode: {
        titleBackgroundColor: DEFAULT_NIGHTMODE_BACKGROUND,
        titleFontColor: 'ffffff',
        loadingColor: 'ffffff',
      },
    },
    hackernews: {
      title: 'Hacker News',
      icon: ['fab', 'hacker-news-square'],
      titleFontColor: 'ffffff',
      titleBackgroundColor: 'fe6501',
      loadingColor: 'fe6501',

      externalLink: 'https://news.ycombinator.com',
      bodyComponentName: 'HackerNewsBody',
      updatedAtThreshold: 5 * MINUTE,

      nightMode: {
        titleBackgroundColor: DEFAULT_NIGHTMODE_BACKGROUND,
        titleFontColor: 'fe6501',
        loadingColor: 'fe6501',
      },
    },
    producthunt: {
      title: 'Product Hunt',
      icon: ['fab', 'product-hunt'],
      titleFontColor: 'ffffff',
      titleBackgroundColor: 'da5430',
      externalLink: 'https://www.producthunt.com',
      updatedAtThreshold: 30 * MINUTE,
    },
  },
};
