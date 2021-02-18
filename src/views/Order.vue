<template>
  <div class="order-box">
    <SimpleHeader :title="title" :parent-go-back="true" />
    <van-tabs @change="onChangeTab" :color="'#1baeae'" :title-active-color="'#1baeae'" class="order-tab" v-model="status">
      <van-tab title="全部" name=''></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="已支付" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
      <van-tab title="交易关闭" name="-100"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="order-list-refresh">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          @offset="300"
      >
        <div v-for="(item, index) in orderList" :key="index" class="order-item-box" @click="toOrderDetail(item.orderNo)">
          <div class="order-item-header">
            <span>订单时间：{{ item.createTime }}</span>
            <span>{{ item.orderStatusString }}</span>
          </div>
          <van-card
              v-for="orderItem in item.orderItems"
              :key="orderItem.orderId"
              :num="orderItem.goodsCount"
              :price="orderItem.sellingPrice"
              desc="全场包邮"
              :title="orderItem.goodsName"
              :thumb="orderItem.goodsCoverImg"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import order from "../api/order";
import SimpleHeader from "../components/SimpleHeader";

export default {
  name: "Order",
  components: { SimpleHeader },
  data() {
    return {
      title: '订单管理',
      status: this.$route.params.status,
      loading: false,
      finished: false,
      refreshing: false,
      orderList: [],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      totalPage: 0
    }
  },
  methods: {
    onChangeTab(name) {
      this.status = name
      this.onRefresh()
    },
    onRefresh() {
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.page = 1
      this.onLoad()
    },
    onLoad(){
      if (!this.refreshing && this.currentPage < this.totalPage) {
        this.currentPage = this.currentPage + 1
      }
      if (this.refreshing) {
        this.currentPage = 1
        this.orderList = [];
      }
      this.getOrderList()
    },
    async getOrderList() {
      await order.getAllPage({ currentPage: this.currentPage, pageSize: this.pageSize, status: this.status }).then(res => {
        const data = res.data;
        console.log(data)
        if (data.currentPage >= data.totalPage) {
          this.finished = true
        }
        if (data.currentPage === 1)  {
          this.orderList = []
        }
        this.orderList = this.orderList.concat(data.list)
        this.totalPage = data.totalPage
        this.totalCount = data.totalCount
        this.currentPage = data.currentPage
        this.pageSize = data.pageSize
      }).catch(() => {
        this.finished = true
      })
      this.loading = false
      this.refreshing = false
    },
    toOrderDetail(orderNo) {
      this.$router.push(`/order-detail/${orderNo}`)
    },
    goBack() {
      this.$router.push('/user')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.order-box {
  .order-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .order-name {
      font-size: 14px;
    }
  }
  .order-tab {
    margin-top: 44px;
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
  }
  .order-list-refresh {
    margin-top: 68px;
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }
    .van-list {
      min-height: calc(100vh - 88px);
      background: #f9f9f9;
      margin-top: 20px;
    }
    .order-item-box {
      margin: 20px 10px;
      background-color: #fff;
      .order-item-header {
        padding: 10px 20px 0 20px;
        display: flex;
        justify-content: space-between;
      }
      .van-card {
        background-color: #fff;
        margin-top: 0;
      }
    }
  }
}
</style>
