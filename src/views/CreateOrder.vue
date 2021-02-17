<template>
  <div class="create-order">
    <SimpleHeader :title="title"></SimpleHeader>
    <div class="address-wrap" v-if="address" @click="toAddress">
      <div class="name">
        <span v-text="address.userName"></span>
        &nbsp;&nbsp;
        <span v-text="address.userPhone"></span>
      </div>
      <div class="address" v-text="address.provinceName + ' ' + address.cityName + ' ' + address.regionName + ' ' + address.detailAddress">
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="address-wrap" v-else @click="toAddress">
      <div class="name">
        <span>暂无默认地址，点击添加</span>
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="good">
      <div class="good-item" v-for="item in cartList" :key="item.cartItemId">
        <div class="good-img"><img :src='item.goodsCoverImg' alt=""></div>
        <div class="good-desc">
          <div class="good-title">
            <span v-text="item.goodsName"></span>
            <span>x{{item.goodsCount}}</span>
          </div>
          <div class="good-btn">
            <div class="price">¥{{item.sellingPrice}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>¥ {{total}}</span>
      </div>
      <van-button class="pay-btn" @click="createOrder" color="#1baeae" type="primary" block>生成订单</van-button>
    </div>
    <van-popup
        closeable
        :close-on-click-overlay="false"
        v-model="showPay"
        position="bottom"
        :style="{ height: '30%' }"
        @close="close"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block @click="payOrder(1)">支付宝支付</van-button>
        <van-button color="#4fc08d" block @click="payOrder(2)">微信支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import cart from "@/api/cart";
import userAddress from "@/api/userAddress";
import order from "@/api/order";

export default {
  name: "CreateOrder",
  components: { SimpleHeader },
  props: {
    cartIds: {
      type: String,
      default: null
    },
    addressId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      title: '生成订单',
      cartList: [],
      address: null,
      orderNo: null,
      showPay: false,
    }
  },
  computed: {
    total() {
      let sum = 0
      this.cartList.forEach(item => {
        sum += item.goodsCount * item.sellingPrice
      })
      return sum
    }
  },
  mounted() {
    if (this.cartIds){
      this.initData()
    }
    this.getAddress()
  },
  methods: {
    async initData() {
      const {data} = await cart.cartSure({cartIds: this.cartIds})
      this.cartList = data
    },
    async getAddress() {
      if (this.addressId) {
        const {data} = await userAddress.getUserAddressById(this.addressId)
        this.address = data
      } else {
        const {data} = await userAddress.getDefaultUserAddress()
        this.address = data
        this.addressId = data.addressId
      }
    },
    toAddress() {
      this.$router.push({name: 'address', params: {cartIds: this.cartIds, addressId: this.address ? this.address.addressId : null, from: 'order'}})
    },
    async createOrder() {
      const param = {
        addressId: this.addressId,
        cartItemIds: this.cartList.map(item => item.cartItemId)
      }
      console.log(param)
      const {data: orderNo} = await order.generateOrder(param)
      this.orderNo = orderNo
      console.log(orderNo)
      this.showPay = true
    },
    close() {
      // 跳转我的订单
      this.$router.push({ path: 'order' })
    },
    async payOrder(type) {
      this.$toast.loading
      await order.paySuccess({
        orderNo: this.orderNo,
        payType: type
      })
      this.$router.push({ path: 'order' })
      this.$toast.clear()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.create-order {
  background: #f9f9f9;
  .address-wrap {
    background: #fff;
    position: relative;
    margin-top: 44px;
    font-size: 14px;
    padding: 15px;
    color: #222333;
    .name, .address {
      margin: 10px 0;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      background-size: 80px;
      content: '';
    }
  }
  .good {
    margin-top: 20px;
    margin-bottom: 120px;
  }
  .good-item {
    padding: 10px;
    background: #fff;
    display: flex;
    .good-img {
      img {
        .wh(100px, 100px)
      }
    }
    .good-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 20px;
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        display: flex;
        justify-content: space-between;
        .price {
          font-size: 16px;
          color: red;
          line-height: 28px;
        }
        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    >div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
