<template>
  <div class="login-box">
    <SimpleHeader :title="type === 'login' ? '登录' : '注册'"></SimpleHeader>
    <div class="login-title">
      <img class="login-img" src="../assets/images/mlogo.png">
    </div>
    <div class="login-body login">
      <van-form :submit-on-enter="false" @submit="onSubmit">
        <van-field
          v-model="form.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          autocomplete="off"
          :rules="[{required: true, message: '请填写用户名'}]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          autocomplete="off"
          :rules="[{required: true, message: '请填写密码'}]"
        />
        <van-field
            v-if="type === 'register'"
            v-model="form.rePassword"
            type="password"
            name="rePassword"
            label="确认密码"
            placeholder="确认密码"
            autocomplete="off"
            :rules="[{validator: rePasswordValidate, message: '请确认密码'}]"
        />
        <div class="verify">
          <Verify
            type="2"
            ref="loginVerifyRef"
            :showButton="false"
            @error="error"
            @success="success"
            width="100%"
            height="40px"
            fontSize="16px"
          />
        </div>
        <div v-if="type === 'login'" class="bottom">
          <router-link class="link-register" to="/register">立即注册</router-link>
          <van-button
              round block
              type="info"
              color="#1baeae"
              native-type="submit">
            登录
          </van-button>
        </div>
        <div v-if="type === 'register'" class="bottom">
          <router-link class="link-register" to="/login">已有账号登录</router-link>
          <van-button
              round block
              type="info"
              color="#1baeae"
              native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import Verify from 'vue2-verify';
// eslint-disable-next-line no-unused-vars
import user from "@/api/user";
import localStorage from "@/utils/localStorage";

export default {
  name: "Login",
  components: { SimpleHeader, Verify },
  data() {
    return {
      type: '',
      verify: false,
      form: {
        username: '123',
        password: '123',
        rePassword: ''
      }
    }
  },
  created() {
    this.type = this.$route.name
  },
  watch: {
    '$route.name'(newVal) {
      if (newVal) {
        this.type = newVal
      }
    }
  },
  methods: {
    rePasswordValidate() {
      if (this.form.rePassword === this.form.password) {
        return true
      } else {
        return false
      }
    },
    dealTriVer() {
      // 执行验证码的验证，通过 this.verify 知道验证码是否填写正确
      this.$refs.loginVerifyRef.$refs.instance.checkCode()
    },
    error(obj) {
      this.verify = false
      obj.refresh()
    },
    success(obj) {
      this.verify = true
      obj.refresh()
    },
    async onSubmit(values) {
      this.dealTriVer()
      if (!this.verify) {
        this.$toast.fail('验证码未填或填写错误!')
        return
      }
      if (this.type === 'login') {
        const data = await user.login({
          username: values.username,
          password: values.password
        })
        localStorage.setLocal("token", data.data)
        this.$toast.success({
          message: '登录成功',
          duration: 500
        })
        this.$router.push("/home")
      } else {
        await user.register({
          username: values.username,
          password: values.password
        }).then(() => {
          this.$toast.success({
            message: '注册成功，请登录',
            duration: 500
          })
          this.$router.push("/login")
        })
      }
    }

  }
}
</script>

<style lang="less">
  .login-box{
    display: flex;
    flex-direction: column;
    justify-content: center;

    .login-title{
      flex: 2;
      display: flex;
      flex-direction: column-reverse;

      .login-img{
        width: 120px;
        height: 120px;
        margin: 0 auto;
      }
    }

    .login-body {
      flex: 5;
      padding: 20px;

      div.cerify-code-panel{
        display: flex;
        margin: 15px 0;
        height: 44px;
        .verify-code{
          flex: 2;
          margin: 0 10px;
        }
        .verify-code-area{
          flex: 3;
          .varify-input-code{
            box-sizing: border-box;
            height: 42px;
            font-size: 16px;
            padding: 0 8px;
            margin-left: 5px;
            border: 1px solid #e9e9e9;
          }
          .verify-change-code{
            line-height: 44px;
            margin-left: 10px;
          }
        }
      }

      .bottom{
        .link-register{
          display: inline-block;
          margin: 5px 25px 20px;
          font-size: 14px;
          color: #1989fa;
        }
        .van-button{
          width: 90%;
          margin: 0 auto;
        }
      }

    }

  }
</style>
