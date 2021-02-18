<template>
  <div class="user-box">
    <SimpleHeader title="我的"></SimpleHeader>
    <div class="user-info">
      <div class="user-img">
        <img class="user-img" src="../assets/images/user-graduate.png">
      </div>
      <div class="user-desc">
        <span>昵称：{{ user.nickName }}</span>
        <span>登录名：{{ user.loginName }}</span>
        <span>个性签名：{{ user.introduceSign }}</span>
      </div>
    </div>
    <ul class="user-content">
      <li>
        <router-link to="/order">我的订单</router-link>
        <van-icon name="arrow" />
      </li>
      <li>
        <router-link to="/setting">账号管理</router-link>
        <van-icon name="arrow" />
      </li>
      <li>
        <router-link to="/address">地址管理</router-link>
        <van-icon name="arrow" />
      </li>
      <li>
        <router-link to="/about">关于我们</router-link>
        <van-icon name="arrow" />
      </li>
    </ul>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import user from "@/api/user";

export default {
  name: "User",
  components: {SimpleHeader},
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      await user.getLoginUser().then(res => {
        this.user = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin.less";

.user-info {
  display: flex;
  height: 115px;
  margin: 50px 13px 20px;
  background: linear-gradient(90deg, @primary, #51c7c7);
  box-shadow: 0 2px 5px #269090;
  border-radius: 6px;

  .user-img {
    flex: 1.8;
    text-align: right;
    margin-right: 8px;
    border-radius: 50px;
    overflow: hidden;
    img{
      width: 60px;
      height: 60px;
      margin-top: 30px;
    }

  }

  .user-desc {
    flex: 5;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    overflow: hidden;
    span {
      color: #fff;
      font-size: 14px;
      margin-right: 10px;
      &:last-child{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}


.user-content{
  margin: 0 20px;

  li{
    display: flex;
    font-size: 15px;
    line-height: 44px;
    border-bottom: 1px solid #e9e9e9;
    a{
      flex: 15;
    }
    i{
      flex: 1;
      line-height: 44px;
    }
  }

}

</style>
