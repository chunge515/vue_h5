<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import { Loading } from 'element-ui';
  export default {
    name: 'app',
    data() {
      return {
      }
    },
    mounted() {
      // this.startLoading({text: 'jahj'});
    },
    methods: {
      
      startLoading(config) {
        debugger;
          let loading = Loading.service({
              target: '.content',
              lock: true,
              spinner: 'el-icon-loading',
              text: config.text || '正在努力加载页面...',
              background: 'rgba(255, 255, 255, 0.8)',
          });
      }
    }
  };
</script>

<style>
  @import '../static/iconfont/iconfont.css';
  #app {
  }
</style>