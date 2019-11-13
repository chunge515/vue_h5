<template>
    <div class="ceshi">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">slider1</div>
            <div class="swiper-slide">slider2</div>
            <div class="swiper-slide">slider3</div>
            <div class="swiper-slide">slider4</div>
            <div class="swiper-slide">slider5</div>
            <div class="swiper-slide">slider6</div>
            <div class="swiper-slide">slider7</div>
            <div class="swiper-slide">slider8</div>
            <div class="swiper-slide">slider9</div>
            <div class="swiper-slide">slider10</div>
            <div class="swiper-slide">slider11</div>
            <div class="swiper-slide">slider12</div>
          </div>
      </div>
    </div>
</template>


<script>
import Swiper from 'swiper';
  export default {
    name: 'ceshi',
    data() {
      return {
        mySwiper: null,
        index: 2,
      }
    },
    mounted() {
      this.init();

      // express 接口获取
      this.getValue();
    },
    methods: {
      init() {
          const _this = this;
          this.mySwiper = new Swiper('.swiper-container',{
            initialSlide : _this.index, // 设定初始化索引
            grabCursor : true, //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。\
            loop: true,
            effect : 'coverflow',
            slidesPerView: 3,
            centeredSlides: true,
            coverflowEffect: {
              rotate: 30,
              stretch: 10,
              depth: 60,
              modifier: 2,
              slideShadows : true
            },
            on: {
              slideChangeTransitionEnd: function(){
                _this.index = this.realIndex;
              },
            },
          });
          this.mySwiper.el.onmouseover = function(){
            console.log(_this.index);

          }
      },

      // 测试链接数据库,获取数据
      getValue() {
        this.getData({
          ip: '172.',
          // project_name: 'bookCollege-mobile',
          // env: 'prod',
        })
        .then((res) => {
        });
      }

    },
  };
</script>

<style>
.ceshi {
  width: 400px;
}
.swiper-slide {
  height: 200px;
  font-size: 32px;
  background: moccasin
}
</style>
