export const BASE_URL = 'https://www.reddit.com';
export const DEFAULT_SUBREDDITS = ['programming'];
export const DEFAULT_SORT = 'hot';
// Reddit answers 403 to extension requests for /hot.json, /new.json and /rising.json,
// so hot is loaded from the bare subreddit listing and new/rising are not offered.
export const SORTS = [
  { value: 'hot', title: 'Hot', path: '', period: '' },
  { value: 'top', title: 'Top today', path: '/top', period: 'day' },
  { value: 'top-week', title: 'Top this week', path: '/top', period: 'week' },
];

export const SUBREDDIT_PLACEMENTS = [
  { value: 'title', title: 'In the title' },
  { value: 'meta', title: 'In the details line' },
];
export const DEFAULT_SUBREDDIT_PLACEMENT = 'title';

/**
 * @param {String} placement
 * @returns {String} - where the post's subreddit is shown, the default place for unknown values.
 */
export const normalizeSubredditPlacement = placement => (
  SUBREDDIT_PLACEMENTS.some(item => item.value === placement) ? placement : DEFAULT_SUBREDDIT_PLACEMENT
);

/**
 * @param {String} sort
 * @returns {String} - the given sort if it is supported, the default one otherwise.
 */
export const normalizeSort = sort => (SORTS.some(item => item.value === sort) ? sort : DEFAULT_SORT);

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
  const { path, period } = SORTS.find(item => item.value === normalizeSort(sort));
  const periodParam = period ? `&t=${period}` : '';

  return `${BASE_URL}/r/${subredditPath}${path}.json?limit=${POST_LIMIT}&raw_json=1${periodParam}`;
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

export const IMPORT_LIMIT = 100;
const SUBSCRIPTIONS_PAGE_SIZE = 100;
const SUBSCRIPTIONS_MAX_PAGES = 10;

/**
 * Loads the subreddits the user is subscribed to, using their reddit.com session in this browser.
 * User profiles the account follows are skipped, they are not subreddits.
 *
 * @param {Function} fetchFn
 * @returns {Promise<String[]>} - subreddit names, sorted alphabetically.
 */
export const fetchSubscribedSubreddits = async (fetchFn = fetch) => {
  const names = [];
  let after = '';

  for (let page = 0; page < SUBSCRIPTIONS_MAX_PAGES; page += 1) {
    const cursor = after ? `&after=${encodeURIComponent(after)}` : '';
    const url = `${BASE_URL}/subreddits/mine/subscriber.json?limit=${SUBSCRIPTIONS_PAGE_SIZE}&raw_json=1${cursor}`;
    // The pages have to be requested one after another, each one gives the cursor for the next.
    // eslint-disable-next-line no-await-in-loop
    const response = await fetchFn(url, { credentials: 'include' });
    if (!response.ok) {
      throw new Error(`Failed to load subscriptions: ${response.status}`);
    }

    // eslint-disable-next-line no-await-in-loop
    const listing = await response.json();
    if (!listing || !listing.data || !Array.isArray(listing.data.children)) {
      throw new Error('Unexpected subscriptions response');
    }

    listing.data.children.forEach(child => {
      const name = child && child.data ? child.data.display_name : '';
      if (name && !name.startsWith('u_')) {
        names.push(name);
      }
    });

    after = listing.data.after;
    if (!after) {
      break;
    }
  }

  return parseSubreddits(names.join(' ')).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
};
