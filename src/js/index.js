import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './routes';

Vue.use(VueRouter);

window.VueBus = new Vue();

new Vue({
  el: '#app',
  router
});
