import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router'
import store from './store';
import GitHubController from "./components/GitHubController";
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.use(VueRouter);
const routes = [
  // { path: '*', component: GitHubController },
  { path: '/github', component: GitHubController }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app');
