export const BASE_URL = 'https://www.reddit.com';
export const DEFAULT_SUBREDDITS = ['programming'];
export const DEFAULT_SORT = 'hot';
export const SORTS = [
  { value: 'hot', title: 'Hot' },
  { value: 'new', title: 'New' },
  { value: 'top', title: 'Top today' },
  { value: 'rising', title: 'Rising' },
];

const POST_LIMIT = 30;

/**
 * Turns free text such as "r/vuejs, webdev  /r/rust" into a list of unique subreddit names.
 * Anything that is not a valid subreddit name is dropped.
 *
 * @param {String} text
 * @returns {String[]}
 */
export const parseSubreddits = text => {
  const names = [];
  String(text || '')
    .split(/[\s,+]+/)
    .map(name => name.replace(/^\/?r\//i, ''))
    .filter(name => /^[A-Za-z0-9_]+$/.test(name))
    .forEach(name => {
      if (!names.some(existing => existing.toLowerCase() === name.toLowerCase())) {
        names.push(name);
      }
    });

  return names;
};

/**
 * @param {{ subreddits: String[], sort: String }} options
 * @returns {String} - the listing URL for the given subreddits and sort order.
 */
export const buildUrl = ({ subreddits, sort } = {}) => {
  const names = parseSubreddits((subreddits || []).join(' '));
  const subredditPath = (names.length > 0 ? names : DEFAULT_SUBREDDITS).join('+');
  const sortPath = SORTS.some(item => item.value === sort) ? sort : DEFAULT_SORT;
  const period = sortPath === 'top' ? '&t=day' : '';

  return `${BASE_URL}/r/${subredditPath}/${sortPath}.json?limit=${POST_LIMIT}&raw_json=1${period}`;
};

/**
 * Reduces a Reddit listing response to the fields the rows need, the whole state is persisted so the raw response is too big to keep.
 *
 * @param {Object} listing
 * @returns {Object[]}
 */
export const toItems = listing => {
  const children = listing && listing.data && Array.isArray(listing.data.children) ? listing.data.children : [];

  return children
    .filter(child => child && child.kind === 't3' && child.data && !child.data.stickied)
    .map(({ data }) => ({
      id: data.id,
      title: data.title,
      url: data.url,
      permalink: data.permalink,
      subreddit: data.subreddit,
      author: data.author,
      score: data.score,
      num_comments: data.num_comments,
      created_utc: data.created_utc,
      is_self: data.is_self,
      domain: data.domain,
    }));
};
