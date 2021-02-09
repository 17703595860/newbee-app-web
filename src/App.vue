<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router-view"/>
    </transition>
    <!-- 通过v-if控制底部导航显示和隐藏，值通过路由监控，如果在列表中，显示，如果不在，隐藏 -->
    <NavBar v-if="isShowNav"></NavBar>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar";
  export default {
    components: { NavBar },
    data() {
      return {
        transitionName: 'slide-left', // 页面滑动动画
        isShowNav: true,  // 是否显示底部导航栏
        showMenuList: ['/', '/home', '/category', '/cart', '/user']  // 要展示底部导航的页面列表
      }
    },
    watch: {
      $route(to, from) {
        // 通过 ES6 提供的 includes 属性判断是否包含在数组内
        if (this.showMenuList.includes(to.path)) {
          this.isShowNav = true
        } else {
          this.isShowNav = false
        }
        // 有主级到次级
        if (to.meta.index > from.meta.index) {
          // 向左滑动
          this.transitionName = 'slide-left'
        } else if (to.meta.index < from.meta.index) {
          // 由次级到主级
          this.transitionName = 'slide-right'
        } else {
          //同级无过渡效果
          this.transitionName = ''
        }
      }
    }
  }
</script>

<style lang="less">
  @import "./common/style/mixin.less";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
  }

  .router-view {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    height: 100%;
    will-change: transform;
    transition: all 500ms;
    position: absolute;
    backface-visibility: hidden;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
