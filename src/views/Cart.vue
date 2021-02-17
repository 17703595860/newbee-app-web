<template>
  <div class="cart-box">
    <SimpleHeader :title="title"></SimpleHeader>
    <div v-if="!cartList.length" class="empty">
      <van-icon name="smile-o" />
      <div class="title">购物车空空空如也</div>
      <van-button color="#1baeae" type="primary" class="empty-button" @click="toHome">前往首页</van-button>
    </div>
    <div v-if="cartList.length" class="cart-body">
      <van-checkbox-group @change="groupChange" v-model="currList" ref="checkboxGroup">
        <van-swipe-cell :right-width="50" v-for="(item, index) in cartList" :key="index">
        <div class="good-item">
          <van-checkbox :name="item.cartItemId" />
          <div class="good-img"><img :src="item.goodsCoverImg" alt="" /></div>
          <div class="good-desc">
            <div class="good-title">
              <span>{{ item.goodsName }}</span>
              <span>x{{ item.goodsCount }}</span>
            </div>
            <div class="good-btn">
              <div class="price">¥{{ item.sellingPrice }}</div>
              <van-stepper
                  integer
                  :min="1"
                  :value="item.goodsCount"
                  :name="item.cartItemId"
                  async-change
                  @change="countChange"
              />
            </div>
          </div>
        </div>
        <van-button
            slot="right"
            square
            icon="delete"
            type="danger"
            class="delete-button"
            @click="deleteCart(item.cartItemId)"
        />
      </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar
        v-if="cartList.length > 0"
        class="submit-all"
        :price="total * 100"
        button-text="结算"
        @submit="toCartSure"
    >
      <van-checkbox @click="allCheck" v-model="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import cart from "@/api/cart";

export default {
  name: "Cart",
  components: { SimpleHeader },
  data() {
    return {
      title: '购物车',
      cartList: [],
      currList: [],
      checkAll: false
    }
  },
  computed: {
    total() {
      let sum = 0
      let _list = this.cartList.filter(item => this.currList.includes(item.cartItemId))
      _list.forEach(item => {
        sum += item.goodsCount * item.sellingPrice
      })
      return sum
    }
  },
  async created() {
    await this.initData()
  },
  methods: {
    async initData() {
      // 加载中禁止点击
      this.$toast.loading({ message: '加载中...', forbidClick: true });
      const {data} = await cart.getAll()
      console.log(data)
      this.cartList = data
      // 默认全选
      this.currList = data.map(item => item.cartItemId)
      this.checkAll = true
      this.$toast.clear()
    },
    groupChange(result){
      if (result.length === this.cartList.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
      this.currList = result
    },
    allCheck() {
      if (this.checkAll) {
        this.currList = this.cartList.map(item => item.cartItemId)
      } else {
        this.currList = []
      }
    },
    countChange(value, detail) {
      if (!value) {
        return
      }
      if (this.cartList.filter(item => item.cartItemId === detail.name)[0].goodsCount === value) {
        return
      }
      this.$toast.loading({message: '修改中', forbidClick: true})
      const param = {
        cartItemId: detail.name,
        goodsCount: value
      }
      cart.updateCart(param).then(() => {
        this.cartList.forEach(item => {
          if (item.cartItemId === detail.name) {
            item.goodsCount = value
          }
        })
      })
      this.$toast.clear()
    },
    deleteCart(cartItemId){
      this.$toast.loading({message: '删除中', forbidClick: true})
      cart.deleteCart(cartItemId).then(() => {
        this.cartList = this.cartList.filter(item => item.cartItemId !== cartItemId)
      })
      this.$toast.clear()
    },
    toCartSure() {
      const cartIds = this.currList.join(',')
      console.log(cartIds)
      this.$router.push({name: 'createOrder', params: {cartIds: cartIds}})
    },
    toHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.empty {
  width: 100%;
  text-align: center;
  margin: 200px auto;
  .van-icon-smile-o {
    font-size: 50px;
  }
  .title {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .empty-button{
    width: 50%;
  }
}
.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    .good-item {
      display: flex;
      .good-img {
        padding: 10px;
        img {
          .wh(80px, 80px)
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
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 10px;
    }
    .van-submit-bar__text {
      margin-right: 10px
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
}
</style>
<style lang="less">
@import '../common/style/mixin';
.van-checkbox__icon--checked .van-icon {
  background-color: @primary;
  border-color: @primary;
}
</style>
