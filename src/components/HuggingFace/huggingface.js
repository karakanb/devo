export const BASE_URL = 'https://huggingface.co';
const API_URL = `${BASE_URL}/api`;
const ITEM_LIMIT = 30;

const REPO_FIELDS = ['author', 'likes', 'downloads', 'createdAt', 'lastModified', 'trendingScore'];

/**
 * The parts of the hub the card can show. Every section lists the sorts and filters its API supports.
 * `expand` limits the repo fields the API sends, the dataset descriptions are too big to keep.
 */
export const SECTIONS = [
  {
    value: 'models',
    title: 'Models',
    path: '/models',
    expand: [...REPO_FIELDS, 'pipeline_tag'],
    sorts: [
      { value: 'trendingScore', title: 'Trending' },
      { value: 'likes', title: 'Most likes' },
      { value: 'downloads', title: 'Most downloads' },
      { value: 'createdAt', title: 'Recently created' },
      { value: 'lastModified', title: 'Recently updated' },
    ],
    filters: ['search', 'author', 'pipelineTag'],
  },
  {
    value: 'spaces',
    title: 'Spaces',
    path: '/spaces',
    expand: ['author', 'likes', 'createdAt', 'lastModified', 'trendingScore', 'sdk', 'cardData'],
    sorts: [
      { value: 'trendingScore', title: 'Trending' },
      { value: 'likes', title: 'Most likes' },
      { value: 'createdAt', title: 'Recently created' },
      { value: 'lastModified', title: 'Recently updated' },
    ],
    filters: ['search', 'author'],
  },
  {
    value: 'datasets',
    title: 'Datasets',
    path: '/datasets',
    expand: REPO_FIELDS,
    sorts: [
      { value: 'trendingScore', title: 'Trending' },
      { value: 'likes', title: 'Most likes' },
      { value: 'downloads', title: 'Most downloads' },
      { value: 'createdAt', title: 'Recently created' },
      { value: 'lastModified', title: 'Recently updated' },
    ],
    filters: ['search', 'author'],
  },
  {
    value: 'papers',
    title: 'Daily Papers',
    path: '/daily_papers',
    expand: [],
    sorts: [
      { value: 'today', title: 'Today' },
      { value: 'trending', title: 'Trending' },
    ],
    filters: [],
  },
  {
    value: 'collections',
    title: 'Collections',
    path: '/collections',
    expand: [],
    sorts: [
      { value: 'trending', title: 'Trending' },
      { value: 'upvotes', title: 'Most upvotes' },
      { value: 'lastModified', title: 'Recently updated' },
    ],
    filters: ['search', 'author'],
  },
];

export const PIPELINE_TAGS = [
  { value: '', title: 'Any task' },
  { value: 'text-generation', title: 'Text generation' },
  { value: 'image-text-to-text', title: 'Image-text to text' },
  { value: 'text-to-image', title: 'Text to image' },
  { value: 'image-to-image', title: 'Image to image' },
  { value: 'text-to-video', title: 'Text to video' },
  { value: 'image-to-video', title: 'Image to video' },
  { value: 'text-to-speech', title: 'Text to speech' },
  { value: 'automatic-speech-recognition', title: 'Speech recognition' },
  { value: 'feature-extraction', title: 'Feature extraction' },
  { value: 'sentence-similarity', title: 'Sentence similarity' },
  { value: 'image-to-3d', title: 'Image to 3D' },
  { value: 'text-to-3d', title: 'Text to 3D' },
  { value: 'robotics', title: 'Robotics' },
];

export const DEFAULT_SETTINGS = {
  section: 'models',
  sort: 'trendingScore',
  search: '',
  author: '',
  pipelineTag: '',
};

/**
 * @param {String} value
 * @returns {Object} - the section with this value, the default one for unknown values.
 */
export const getSection = value => (
  SECTIONS.find(section => section.value === value) || SECTIONS.find(section => section.value === DEFAULT_SETTINGS.section)
);

const cleanText = (value, maxLength) => String(value || '').trim().slice(0, maxLength);

/**
 * Keeps only what the chosen section supports: an unknown sort falls back to the section's first one,
 * and filters the section has no use for are cleared.
 *
 * @param {Object} settings
 * @returns {{ section: String, sort: String, search: String, author: String, pipelineTag: String }}
 */
export const normalizeSettings = (settings = {}) => {
  const section = getSection(settings.section);
  const sort = section.sorts.some(item => item.value === settings.sort) ? settings.sort : section.sorts[0].value;
  const has = filter => section.filters.includes(filter);
  const author = cleanText(settings.author, 96).replace(/^@/, '');
  const pipelineTag = PIPELINE_TAGS.some(item => item.value === settings.pipelineTag) ? settings.pipelineTag : '';

  return {
    section: section.value,
    sort,
    search: has('search') ? cleanText(settings.search, 100) : '',
    author: has('author') && /^[A-Za-z0-9][\w.-]*$/.test(author) ? author : '',
    pipelineTag: has('pipelineTag') ? pipelineTag : '',
  };
};

/**
 * @param {Object} settings
 * @returns {String} - the API url for the given section, sort and filters.
 */
export const buildUrl = settings => {
  const {
    section: sectionValue, sort, search, author, pipelineTag,
  } = normalizeSettings(settings);
  const section = getSection(sectionValue);
  const params = new URLSearchParams();
  params.set('limit', String(ITEM_LIMIT));

  if (section.value === 'papers') {
    if (sort !== 'today') {
      params.set('sort', sort);
    }
  } else {
    params.set('sort', sort);
  }

  if (search) {
    params.set(section.value === 'collections' ? 'q' : 'search', search);
  }
  if (author) {
    params.set(section.value === 'collections' ? 'owner' : 'author', author);
  }
  if (pipelineTag) {
    params.set('pipeline_tag', pipelineTag);
  }
  section.expand.forEach(field => params.append('expand[]', field));

  return `${API_URL}${section.path}?${params.toString()}`;
};

const REPO_PATHS = { model: '', dataset: '/datasets', space: '/spaces' };

const toRepoItem = (item, kind) => {
  const card = item.cardData || {};
  const [owner, name] = String(item.id).split('/');

  return {
    kind,
    id: item.id,
    title: kind === 'space' && card.title ? card.title : item.id,
    url: `${BASE_URL}${REPO_PATHS[kind]}/${item.id}`,
    subtitle: kind === 'space' ? cleanText(card.short_description, 160) : '',
    emoji: kind === 'space' ? card.emoji || '' : '',
    tag: kind === 'model' ? item.pipeline_tag || '' : '',
    author: item.author || (name ? owner : ''),
    likes: item.likes || 0,
    downloads: kind === 'space' ? null : item.downloads || 0,
    comments: null,
    date: item.createdAt || item.lastModified || '',
  };
};

const toPaperItem = entry => {
  const paper = entry.paper || {};

  return {
    kind: 'paper',
    id: paper.id,
    title: paper.title || entry.title || paper.id,
    url: `${BASE_URL}/papers/${paper.id}`,
    subtitle: '',
    emoji: '',
    tag: '',
    author: entry.organization && entry.organization.name ? entry.organization.name : '',
    likes: paper.upvotes || 0,
    downloads: null,
    comments: entry.numComments || 0,
    date: paper.publishedAt || entry.publishedAt || '',
  };
};

const toCollectionItem = collection => ({
  kind: 'collection',
  id: collection.slug,
  title: collection.title || collection.slug,
  url: `${BASE_URL}/collections/${collection.slug}`,
  subtitle: cleanText(collection.description, 160),
  emoji: '',
  tag: '',
  author: collection.owner && collection.owner.name ? collection.owner.name : '',
  likes: collection.upvotes || 0,
  downloads: null,
  comments: null,
  date: collection.lastUpdated || '',
});

const MAPPERS = {
  models: item => toRepoItem(item, 'model'),
  datasets: item => toRepoItem(item, 'dataset'),
  spaces: item => toRepoItem(item, 'space'),
  papers: toPaperItem,
  collections: toCollectionItem,
};

/**
 * Reduces an API response to the fields the rows need, the whole state is persisted so the raw response is too big to keep.
 *
 * @param {Object[]} data
 * @param {String} section - the section the response was loaded for.
 * @returns {Object[]}
 */
export const toItems = (data, section) => {
  if (!Array.isArray(data)) {
    return [];
  }

  const toItem = MAPPERS[getSection(section).value];
  return data
    .filter(item => item && typeof item === 'object')
    .map(toItem)
    .filter(item => item.id);
};
