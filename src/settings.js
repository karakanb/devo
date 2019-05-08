const MINUTE = 60000;
const DEFAULT_NIGHTMODE_BACKGROUND = '31363e';

export default {
  platforms: {
    github: {
      dataUrl: 'https://devo.burakkarakan.com/api/github',
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
      dataUrl: 'https://devo.burakkarakan.com/api/hackernews',
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
      dataUrl: 'https://devo.burakkarakan.com/api/producthunt',
      title: 'Product Hunt',
      icon: ['fab', 'product-hunt'],
      titleFontColor: 'ffffff',
      titleBackgroundColor: 'da5430',
      loadingColor: 'da5430',

      externalLink: 'https://www.producthunt.com',
      bodyComponentName: 'ProductHuntBody',
      updatedAtThreshold: 30 * MINUTE,

      nightMode: {
        titleBackgroundColor: DEFAULT_NIGHTMODE_BACKGROUND,
        titleFontColor: 'da5430',
        loadingColor: 'da5430',
      },
    },
    designernews: {
      dataUrl: 'https://www.designernews.co/api/v2/stories',
      title: 'Designer News',
      icon: ['fas', 'newspaper'],
      titleFontColor: 'ffffff',
      titleBackgroundColor: '2d72d9',
      loadingColor: '2d72d9',

      externalLink: 'https://news.ycombinator.com',
      bodyComponentName: 'DesignerNewsBody',
      updatedAtThreshold: 5 * MINUTE,

      nightMode: {
        titleBackgroundColor: DEFAULT_NIGHTMODE_BACKGROUND,
        titleFontColor: '7aace4',
        loadingColor: '7aace4',
      },
    },
  },
};
