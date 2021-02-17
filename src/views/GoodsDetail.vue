<template>
  <div class="product-detail">
    <SimpleHeader :title="title"></SimpleHeader>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" :autoplay="5000" indicator-color="#1baeae">
          <van-swipe-item v-for="(item, index) in detail.goodsCarousels" :key="index">
            <img :src="item" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">
          {{ detail.goodsName }}
        </div>
        <div class="product-desc">免邮费 顺丰快递</div>
        <div class="product-price">
          <span>¥{{ detail.sellingPrice }}</span>
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="product-content" v-html="detail.goodsDetailContent"></div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" :info="!getCartCount ? '' : getCartCount" @click="goCart()" text="购物车"/>
      <van-goods-action-button type="warning" @click="addCart" text="加入购物车" />
      <van-goods-action-button type="danger" @click="goToCart" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import goods from "@/api/goods";
import cart from "@/api/cart";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "GoodsDetail",
  components: { SimpleHeader },
  data() {
    return {
      title: '商品详情',
      goodsId: this.$route.params.id,
      detail: {}
    }
  },
  async created() {
    await this.getDetail()
  },
  computed: {
    ...mapGetters(['getCartCount'])
  },
  methods: {
    ...mapActions(['updateCart']),
    async getDetail() {
      if (this.goodsId) {
        let {data} = await goods.getGoodsDetail({ id: this.goodsId })
        console.log(data)
        this.detail = data
      }
    },
    goCart() {
      this.$router.push({ path: '/cart' })
    },
    async addCart() {
      if (this.detail.goodsId){
        await cart.addCart({ goodsId: this.detail.goodsId, goodsCount: 1 })
        this.$toast.success('添加成功')
        this.updateCart()
      }
    },
    async goToCart() {
      await cart.addCart({ goodsCount: 1, goodsId: this.detail.goodsId })
      this.$store.dispatch('updateCart')
      this.$router.push({ path: '/cart' })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.product-detail {
  .detail-header {
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
    .product-name {
      font-size: 14px;
    }
  }
  .detail-content {
    margin-top: 44px;
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-price {
        .fj();
        span:nth-child(1) {
          color: #F63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .product-content {
        width: 100%;
        overflow: hidden;
        /deep/ img {
          width: 100%;
        }
      }
    }
  }
  .van-goods-action-button--warning {
    background: linear-gradient(to right,#6bd8d8, @primary)
  }
  .van-goods-action-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888)
  }
}
</style>
