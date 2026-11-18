import { createApp } from 'vue';
import { library, config } from '@fortawesome/fontawesome-svg-core';
// Icon sizing ships in app.css instead of being injected by JS, so the page snapshot
// (painted before any JS runs, see public/snapshot.js) never shows unstyled, giant icons.
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faGithub, faHackerNewsSquare, faProductHunt, faDev } from '@fortawesome/free-brands-svg-icons';
import {
  faSyncAlt, faCodeBranch, faStar, faChevronUp, faComment, faExternalLinkAlt, faSun, faMoon,
  faCheck, faCaretUp, faCaretDown, faNewspaper, faHeart, faAnchor, faThLarge, faFolder,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import store from './store';
import { watchSnapshot } from './snapshot';

config.autoAddCss = false;

library.add([faGithub, faHackerNewsSquare, faProductHunt, faSyncAlt,
  faCodeBranch, faStar, faChevronUp, faComment, faExternalLinkAlt, faSun, faMoon, faCheck, faCaretUp, faCaretDown,
  faNewspaper, faDev, faHeart, faAnchor, faThLarge, faFolder]);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.mount('#app');

watchSnapshot(store, document.getElementById('app'));
