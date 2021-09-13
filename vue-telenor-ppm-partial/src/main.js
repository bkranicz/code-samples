import Vue from 'vue'
import App from './App'

import { store } from './store/store'
import { router } from './router/routes'

import BootstrapVue from 'bootstrap-vue';
import globals from './globals';
import Popper from 'popper.js';
import VueSweetalert2 from 'vue-sweetalert2';
import VueObserveVisibility from 'vue-observe-visibility';
import VueJwtDecode from 'vue-jwt-decode';
import VueCookies from 'vue-cookies';
import browserDetect from "vue-browser-detect-plugin";
import VCalendar from 'v-calendar';
import VueExcelXlsx from "vue-excel-xlsx";


// Required to enable animations on dropdowns/tooltips/popovers
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(VueObserveVisibility);
Vue.use(VueCookies);
Vue.use(VueJwtDecode);
Vue.use(browserDetect);
Vue.use(VCalendar);
Vue.use(VueExcelXlsx);

// Global RTL flag
Vue.mixin({
  data: globals
})

new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
