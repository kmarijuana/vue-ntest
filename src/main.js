import Vue from "vue";
import App from "./App";
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"


import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify)
Vue.use(ClientTable)
Vue.use(BlackDashboard);

import {ServerTable, ClientTable, Event} from 'vue-tables-2';
/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");