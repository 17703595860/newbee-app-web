<template>
  <div class="home">
    <div class="header" :class="headerScroll ? 'active' : ''">
      <router-link class="header-left" to="/category">
        <i class="nbicon nbmenu2"></i>
      </router-link>
      <div class="search-box">
        <span class="search-left">新蜂商城</span>
        <i class="search-middle">|</i>
        <router-link class="search-right" to="/search-list">山河无恙，人间皆安</router-link>
      </div>
      <router-link v-if="!isLogin" class="header-right" to="./login" >
        登录
      </router-link>
      <router-link v-else class="header-right" to="./user">
        <van-icon name="manager-o" />
      </router-link>
    </div>
    <!--  轮播图  -->
    <van-swipe class="my-swipe" :autoplay="5000" indicator-color="#1baeae">
      <van-swipe-item v-for="(item, index) in carouseList" :key="index">
        <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)">
      </van-swipe-item>
    </van-swipe>
    <!--  分类  -->
    <div class="category-list">
      <div class="category-item" v-for="item in categoryList" v-bind:key="item.categoryId">
        <img :src="item.imgUrl">
        <span>{{item.name}}</span>
      </div>
    </div>
    <!--  商品  -->
    <div class="goods">
      <header class="goods-header">推荐商品</header>
      <div class="goods-box">
        <div class="goods-item" v-for="item in recommendGoodsList" :key="item.goodsId" @click="goToDetail(item.goodsId)">
          <img class="goods-img" :src="item.goodsCoverImg" alt="">
          <div class="goods-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">¥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="goods">
      <header class="goods-header">新品上线</header>
      <div class="goods-box">
        <div class="goods-item" v-for="item in newGoodsList" :key="item.goodsId" @click="goToDetail(item.goodsId)">
          <img class="goods-img" :src="item.goodsCoverImg" alt="">
          <div class="goods-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">¥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="goods">
      <header class="goods-header">热门商品</header>
      <div class="goods-box">
        <div class="goods-item" v-for="item in hotGoodsList" :key="item.goodsId" @click="goToDetail(item.goodsId)">
          <img class="goods-img" :src="item.goodsCoverImg" alt="">
          <div class="goods-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">¥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>

<script>
import localStorage from "@/utils/localStorage";
import indexInfo from "@/api/indexInfo"

export default {
  name: 'Home',
  data() {
    return {
      isLogin: false,
      headerScroll: false,
      carouseList: [],
      newGoodsList: [],
      hotGoodsList: [],
      recommendGoodsList: [],
      categoryList: [
        {
          name: '新蜂超市',
          imgUrl: '//s.weituibao.com/1583585285461/cs.png',
          categoryId: 100001
        }, {
          name: '新蜂服饰',
          imgUrl: '//s.weituibao.com/1583585285468/fs.png',
          categoryId: 100003
        }, {
          name: '全球购',
          imgUrl: '//s.weituibao.com/1583585285470/qq.png',
          categoryId: 100002
        }, {
          name: '新蜂生鲜',
          imgUrl: '//s.weituibao.com/1583585285472/sx.png',
          categoryId: 100004
        }, {
          name: '新蜂到家',
          imgUrl: '//s.weituibao.com/1583585285467/dj.png',
          categoryId: 100005
        }, {
          name: '充值缴费',
          imgUrl: '//s.weituibao.com/1583585285465/cz.png',
          categoryId: 100006
        }, {
          name: '9.9元拼',
          imgUrl: '//s.weituibao.com/1583585285469/pt.png',
          categoryId: 100007
        }, {
          name: '领劵',
          imgUrl: '//s.weituibao.com/1583585285468/juan.png',
          categoryId: 100008
        }, {
          name: '省钱',
          imgUrl: '//s.weituibao.com/1583585285471/sq.png',
          categoryId: 100009
        }, {
          name: '全部',
          imgUrl: '//s.weituibao.com/1583585285470/qb.png',
          categoryId: 100010
        }
      ],
    }
  },
  created() {
    this.initData()
    window.addEventListener('scroll', this.pageScroll)
  },
  methods: {
    pageScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      scrollTop > 100 ? this.headerScroll = true : this.headerScroll = false
    },
    async initData() {
      let token = localStorage.getLocal('token')
      if (token) {
        this.isLogin = true
      }
      await indexInfo.getAll().then(res => {
        this.carouseList = res.data.carouses
        this.newGoodsList = res.data.newGoods
        this.hotGoodsList = res.data.hotGoods
        this.recommendGoodsList = res.data.recommendGoods
      })
    },
    goTo(redirectUrl){
      console.log(redirectUrl)
      // window.open(redirectUrl)
      this.$router.push('/goodsDetail/' + 10233)
    },
    goToDetail(goodsId){
      this.$router.push('/goodsDetail/' + goodsId)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin.less";

body{
  padding-bottom: 50px!important;
}
.header{
  display: flex;
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  color: #1baeae;

  &.active{
    background: @primary;
    .header-right{
      color: #fff;
    }
    i{
      color: #fff;
    }
  }

  i{
    font-size: 20px;
    color: #1baeae;
  }

  .header-left{
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    text-align: center;
    padding: 15px 0;
    overflow: hidden;
  }

  .search-box{
    flex: 1;
    margin: 9px 60px;
    box-sizing: border-box;
    height: 35px;
    padding: 4px 20px;
    border-radius: 19px;
    display: flex;
    vertical-align: middle;
    border: 1px solid #ddd;
    background: rgba(255, 255, 255, 0.7);

    .search-left{
      flex: 5;
      font-size: 18px;
      font-weight: 700;
    }
    .search-middle{
      flex: 1;
      box-sizing: border-box;
      padding-left: 5px;
      opacity: 0.5;
      color: #666;
    }
    .search-right{
      flex: 8;
      font-size: 13px;
      margin-top: 4px;
      opacity: 0.8;
      color: #666;
    }
  }

  .header-right{
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    text-align: center;
    padding: 15px 0;
    color: @primary;
    font-size: 15px;
  }
}

.my-swipe .van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}

.category-list{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .category-item{
    width: 20%;
    height: 77px;
    display: flex;
    flex-flow: column nowrap;
    text-align: center;
    margin-top: 10px;
    img{
      width: 44px;
      height: 44px;
      margin: 0 auto;
    }
    span{
      margin: 6px 0;
    }
  }
}

.goods{
  width: 100%;
  background: #fff;

  .goods-header{
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #1baeae;
    font-size: 14px;
    font-weight: 500;
  }
  .goods-box{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    .goods-item{
      width: 50%;
      height: 200px;
      box-sizing: border-box;
      padding: 10px;
      text-align: center;
      .goods-img{
        width: 110px;
        height: 110px;
        margin-bottom: 5px;
      }
      .goods-desc{
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 14px;
        .title{
          margin-bottom: 5px;
        }
      }
      &:nth-child(2n+1) {
        border-bottom: 1px solid #e9e9e9;
        border-right: 1px solid #e9e9e9;
      }
      &:nth-child(2n) {
        border-bottom: 1px solid #e9e9e9;
      }
    }
  }
}

</style>
