<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router-view"/>
    </transition>
    <div id="nav" style="position: relative;z-index: 9999999999">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    watch: {
      $router(to, from) {
        if (to.meta.index > from.meta.index) {
          this.transitionName = 'slide-left' // 向左滑动
        } else if (to.meta.index < from.meta.index) {
          this.transitionName = 'slide-right' // 向右滑动
        } else {
          this.transitionName = ''  // 同级无过度动画
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
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
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
