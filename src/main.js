import Vue from 'vue';
import 'babel-polyfill';
import router from './router/index';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../utils/rem'
import '../static/css/reset.css'
import './assets/css/font.css'

// import Swiper from 'swiper';
import 'swiper/css/swiper.css'

import vuePrototype from './servers/index'

import App from './app.vue'
//定义一部分公共的方法或者计算属性,然后混入到各个组件中使用,方便管理与统一修改
import mixin from '@/mixins';
Vue.mixin(mixin());
Vue.use(ElementUI);
// Vue.use(Swiper);

// 请求接口
for (let key in vuePrototype) {
    Vue.prototype[key] = vuePrototype[key];
  }

window.$vue = new Vue({
    router,
    render: h => h(App),
}).$mount('#app');