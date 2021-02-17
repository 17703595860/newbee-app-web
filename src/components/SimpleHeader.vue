<template>
  <div class="simple-header-box">
    <i class="nbicon nbfanhui" @click="goBack"></i>
    <div class="simple-header-title" v-if="this.showTitle" v-text="title"></div>
    <slot name="center"></slot>
    <van-popover
        v-model="showPopover"
        placement="bottom-end"
        trigger="click"
        :actions="actions"
        @select="onSelect"
    >
      <template #reference>
        <i class="nbicon nbmore"></i>
      </template>
    </van-popover>
  </div>
</template>

<script>
import user from "@/api/user";

// 简单公共头部抽取
export default {
  name: "SimpleHeader",
  props: {
    title: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    parentGoBack: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showPopover: false,
      actions: [{ text: '我的' }, { text: '退出登录' }]
    }
  },
  methods: {
    goBack() {
      if (this.parentGoBack) {
        this.$parent.goBack()
      } else {
        this.$router.go(-1)
      }
    },
    async onSelect({text}) {
      if (text === '我的') {
        if (this.$route.name === 'user') {
          return
        }
        this.$router.push('/user')
      } else if (text === '退出登录') {
        await user.logout()
        this.$toast.success('退出成功')
        window.localStorage.removeItem('token')
        window.setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      }
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
    span{
      width: 44px;
      height: 44px;
      margin-right: 2px;
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
