<template>
  <div class="seting-box">
    <SimpleHeader :title="title"></SimpleHeader>
    <div class="input-item">
      <van-field v-model="nickName" label="昵称" />
      <van-field v-model="introduceSign" label="个性签名" />
      <van-field v-model="password" type='password' label="修改密码" />
    </div>
    <van-button class="save-btn" color="#1baeae" type="primary" @click="save" block>保存</van-button>
    <van-button class="save-btn" color="#1baeae" type="primary" @click="logout" block>退出登录</van-button>
  </div>
</template>

<script>
  import SimpleHeader from "../components/SimpleHeader";
  import user from "../api/user";

  export default {
    components: { SimpleHeader },
    data() {
      return {
        title: '账号管理',
        nickName: '',
        introduceSign: '',
        password: ''
      }
    },
    async mounted() {
      const { data } = await user.getLoginUser()
      console.log(data)
      this.nickName = data.nickName
      this.introduceSign = data.introduceSign
    },
    methods: {
      async save() {
        const params = {
          introduceSign: this.introduceSign,
          nickName: this.nickName,
          password: this.password
        }
        await user.updateUserInfo(params)
        this.$toast.success('保存成功')
      },
      async logout() {
        await user.logout()
        this.$toast.success('退出成功')
        window.localStorage.removeItem('token')
        window.setTimeout(() => {
          this.$router.push('/login')
        }, 500)
      }
    }
  }
</script>

<style lang="less" scoped>
  .seting-box {
    .input-item {
      margin-top: 44px;
    }
    .save-btn {
      width: 80%;
      margin: 20px auto ;
    }
  }
</style>
