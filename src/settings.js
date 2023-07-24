import SingleColumn from './layouts/SingleColumn.vue';
import TwoColumns from './layouts/TwoColumns.vue';
import ThreeColumns from './layouts/ThreeColumns.vue';
import TwoLeftOneRight from './layouts/TwoLeftOneRight.vue';
import OneLeftTwoRight from './layouts/OneLeftTwoRight.vue';
import TwoRowsTwoColumns from './layouts/TwoRowsTwoColumns.vue';

const DEFAULT_NIGHTMODE_BACKGROUND = '31363e';

export default {
  platforms: {
    github: {
      dataUrl: 'https://devo-platforms.burakkarakan.com/github.json',
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
      dataUrl: 'https://devo-platforms.burakkarakan.com/hackernews.json',
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
      dataUrl: 'https://devo.ams3.digitaloceanspaces.com/producthunt.json',
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
      titleBackgroundColor: '9e271b',
      loadingColor: '9e271b',

      externalLink: 'https://lobste.rs',
      bodyComponentName: 'LobstersBody',

      nightMode: {
        titleBackgroundColor: DEFAULT_NIGHTMODE_BACKGROUND,
        titleFontColor: 'ec8f8f',
        loadingColor: 'ec8f8f',
      },
    },
    tabnews: {
      dataUrl: 'https://www.tabnews.com.br/api/v1/contents?page=1&per_page=20&strategy=relevant',
      title: 'TabNews',
      icon: ['fa', 'folder'],
      titleFontColor: 'ffffff',
      titleBackgroundColor: '24292f',
      loadingColor: '9e271b',

      externalLink: 'https://www.tabnews.com.br',
      bodyComponentName: 'TabNewsBody',

      nightMode: {
        titleBackgroundColor: DEFAULT_NIGHTMODE_BACKGROUND,
        titleFontColor: '8eb5e3',
        loadingColor: '8eb5e3',
      },
    },
  },
  layouts: [
    {
      displayName: 'Single Column',
      component: SingleColumn.name,
    },
    {
      displayName: 'Two Columns',
      component: TwoColumns.name,
    },
    {
      displayName: 'Three Columns',
      component: ThreeColumns.name,
    },
    {
      displayName: 'Two Left, One Right',
      component: TwoLeftOneRight.name,
    },
    {
      displayName: 'One Left, Two Right',
      component: OneLeftTwoRight.name,
    },
    {
      displayName: 'Four Cards',
      component: TwoRowsTwoColumns.name,
    },
  ],
};
