/* eslint-disable import/prefer-default-export */

/**
 * This file is where platform settings panels are mapped to their implementations.
 *
 * A platform that has its own settings denotes the panel with the key `settingsComponentName` in the `settings.js` file.
 * The `PlatformCard` component then shows a settings button in the card title, and renders the panel in the card body.
 * The panel emits `saved` once the settings are stored, which reloads the platform data, or `close` to be dismissed.
 */
export { default as RedditSettings } from './Reddit/Settings.vue';
