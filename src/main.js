import Vue from 'vue';
import 'flexboxgrid';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faHackerNewsSquare, faProductHunt, faDev } from '@fortawesome/free-brands-svg-icons';
import {
  faSyncAlt, faCodeBranch, faStar, faChevronUp, faComment, faExternalLinkAlt, faSun, faMoon,
  faCheck, faCaretDown, faNewspaper, faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import store from './store';

library.add([faGithub, faHackerNewsSquare, faProductHunt, faSyncAlt,
  faCodeBranch, faStar, faChevronUp, faComment, faExternalLinkAlt, faSun, faMoon, faCheck, faCaretDown,
  faNewspaper, faDev, faHeart]);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
