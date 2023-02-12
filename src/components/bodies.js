/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */

/**
 * This file is where platform bodies are mapped to their implementations.
 * When rendering a platform, the card itself is used as a generic wrapper, and body is passed as a separate coponent.
 *
 * Every platform has to have a body denoted with the key `bodyComponentName` in the `settings.js` file.
 * The name mentioned in that key must match with what is defined here, such as `GitHubBody` for GitHub.
 * The `PlatformCard` component is responsible for resolving and passing the appropriate body to the card.
 *
 * If you want to add a new platform, just build yourself the body class and export it here.
 * Once you have the UI export the body here, put the details in `settings.js` file and you are good to go.
 */
export { default as GitHubBody } from './GitHub/Body.vue';
export { default as HackerNewsBody } from './HackerNews/Body.vue';
export { default as ProductHuntBody } from './ProductHunt/Body.vue';
export { default as DesignerNewsBody } from './DesignerNews/Body.vue';
export { default as DevtoBody } from './Devto/Body.vue';
export { default as LobstersBody } from './Lobsters/Body.vue';
export { default as TabNewsBody } from './TabNews/Body.vue';
