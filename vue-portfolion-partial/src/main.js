import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MarkdownItVue from 'markdown-it-vue';
import VueKinesis from 'vue-kinesis';
import Transitions from 'vue2-transitions';
import VuePageTransition from 'vue-page-transition';
import VueAos from 'vue-aos';
import checkView from 'vue-check-view';
import VueMarquee from 'vue-marquee-component';
import VueGtag from "vue-gtag";
import VueTypedJs from 'vue-typed-js'
import VueMeta from 'vue-meta'

var VueScrollTo = require('vue-scrollto');

Vue.use(VueTypedJs)
Vue.use(MarkdownItVue);
Vue.use(VueKinesis);
Vue.use(Transitions);
Vue.use(VuePageTransition);
Vue.use(VueAos);
Vue.use(checkView);
Vue.use(VueMarquee);
Vue.use(VueMeta);
Vue.use(VueScrollTo, { offset: -100 });
Vue.use(VueGtag, {
  config: { id: "G-T4E3Q10PG4" },
  appName: 'portfolion',
  pageTrackerScreenviewEnabled: true
}, router);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')