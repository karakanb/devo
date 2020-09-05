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

      externalLink: 'https://www.designernews.co',
      bodyComponentName: 'DesignerNewsBody',

      nightMode: {
        titleBackgroundColor: DEFAULT_NIGHTMODE_BACKGROUND,
        titleFontColor: '85c7fb',
        loadingColor: '85c7fb',
      },
    },
    devto: {
      dataUrl: () => {
        const randomPage = Math.random().toString(36).substring(3);
        return `https://dev.to/api/articles?page=${randomPage}`;
      },
      title: 'DEV Community',
      icon: ['fab', 'dev'],
      titleFontColor: 'ffffff',
      titleBackgroundColor: '0a0a0a',
      loadingColor: '0a0a0a',

      externalLink: 'https://dev.to',
      bodyComponentName: 'DevtoBody',

      nightMode: {
        titleBackgroundColor: DEFAULT_NIGHTMODE_BACKGROUND,
        titleFontColor: 'ffffff',
        loadingColor: 'ffffff',
      },
    },
    lobsters: {
      dataUrl: 'https://lobste.rs/hottest.json',
      title: 'Lobsters',
      icon: ['fa', 'anchor'],
      titleFontColor: 'ffffff',
      titleBackgroundColor: '9E271B',
      loadingColor: '9E271B',

      externalLink: 'https://lobste.rs',
      bodyComponentName: 'LobstersBody',

      nightMode: {
        titleBackgroundColor: DEFAULT_NIGHTMODE_BACKGROUND,
        titleFontColor: 'ffffff',
        loadingColor: 'ffffff',
      },
    },
  },
};
