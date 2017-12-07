import VueRouter from 'vue-router';
import MarkDownComponent from './MarkDownComponent.vue';

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/*',
      component: MarkDownComponent
    }
  ]
});
