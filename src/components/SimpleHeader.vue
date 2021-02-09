<template>
  <div class="simple-header-box">
    <i class="nbicon nbfanhui" @click="goBack"></i>
    <div class="simple-header-title" v-text="title"></div>
    <i class="nbicon nbmore"></i>
  </div>
</template>

<script>
// 简单公共头部抽取
export default {
  name: "SimpleHeader",
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  .simple-header-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .simple-header-title{
      font-size: 14px;
    }
    i{
      width: 44px;
      height: 44px;
    }
    div{
      flex: 1;
    }
  }
</style>
