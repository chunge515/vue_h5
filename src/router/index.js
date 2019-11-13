import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

var router =  new Router({
    mode: 'history',
    routes: [
      {
         path: '/',
        redirect: '/home',
        name: 'home'
      },
      {
        path: '/home',
        component: resolve => require(['../pages/index.vue'], resolve),
      },
        {
          path: '/ceshi',
          component: resolve => require(['../pages/ceshi/index.vue'], resolve),
        },
    ]
});

router.beforeEach((to, from, next) => {
  // debugger;
  next()
  })
export default router ;