import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faHackerNewsSquare, faProductHunt, faDev } from '@fortawesome/free-brands-svg-icons';
import {
  faSyncAlt, faCodeBranch, faStar, faChevronUp, faComment, faExternalLinkAlt, faSun, faMoon,
  faCheck, faCaretUp, faCaretDown, faNewspaper, faHeart, faAnchor, faThLarge, faFolder,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import store from './store';

library.add([faGithub, faHackerNewsSquare, faProductHunt, faSyncAlt,
  faCodeBranch, faStar, faChevronUp, faComment, faExternalLinkAlt, faSun, faMoon, faCheck, faCaretUp, faCaretDown,
  faNewspaper, faDev, faHeart, faAnchor, faThLarge, faFolder]);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.mount('#app');
