<template>
  <div class="search-list">
    <div class="product-list-content">
      <header class="category-header wrap">
        <i class="nbicon nbfanhui" @click="goBack"></i>
        <div class="header-search">
          <i class="nbicon nbSearch"></i>
          <input
              type="text"
              class="search-title"
              v-model="keyword"/>
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>
      <van-tabs type="card" color="#1baeae" @click="changeTab" >
        <van-tab title="推荐" name="default"></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="product-list-refresh">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          @offset="300"
      >
        <!-- <p v-for="item in list" :key="item">{{ item }}</p> -->
        <div class="product-item" v-for="(item, index) in goodsList" :key="index" @click="goodsDetail(item.goodsId)">
          <img :src="item.goodsCoverImg" />
          <div class="product-info">
            <p class="name">{{item.goodsName}}</p>
            <p class="subtitle">{{item.goodsIntro}}</p>
            <span class="price">￥ {{item.sellingPrice}}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import goods from "@/api/goods";
export default {
  name: "SearchList",
  data() {
    return {
      categoryId: this.$route.params.categoryId,  // 三级分类id
      keyword: this.$route.params.keyword,    // 查询参数，商品名称
      orderBy: 'default', // 排序字段,default默认，new新品排序，price，价格排序
      order: false,  // 排序方式，true升序，false降序，默认降序
      goodsList: [],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      totalPage: 0,
      refreshing: false, // 是否下拉刷新
      loading: false,
      finished: false, // 是否没有更多
    }
  },
  methods: {
    changeTab(name) {
      if (this.orderBy === name) {
        this.order = !this.order
      } else {
        this.orderBy = name
        this.order = false
      }
      // 切换排序后，请0
      this.totalPage = 0
      this.totalCount = 0
      this.currentPage = 1
      this.goodsList = []
      this.finished = false
      this.onRefresh()
    },
    async getSearch() {
      this.onRefresh()
    },
    async onLoad() {
      if (!this.refreshing && this.currentPage < this.totalPage) {
        this.currentPage ++
      }
      if (this.totalCount !== 0 && this.currentPage >= this.totalPage) {
        this.loading = false
        return
      }
      if (this.refreshing) {
        this.goodsList = []
      }
      await this.getGoods()
      this.loading = false
      this.refreshing = false
      console.log(this.goodsList)
    },
    async getGoods() {
      await goods.getAll({
        keyword: this.keyword,
        categoryId: this.categoryId,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        orderBy: this.orderBy,
        order: this.order
      }).then((res => {
        const data = res.data
        this.currentPage = data.currentPage
        // 解决只有一页美容时，同时出发list和下拉刷新的加载时间
        if (this.currentPage === 1) {
          this.goodsList = []
        }
        this.goodsList = this.goodsList.concat(data.list)
        this.pageSize = data.pageSize
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
        if (this.currentPage >= data.totalPage){
          this.finished = true
        }
      }))
    },
    goBack() {
      this.$router.go(-1)
    },
    async onRefresh() {
      // 下拉刷新
      this.refreshing = true
      // 清空数据
      this.totalPage = 0
      this.totalCount = 0
      this.currentPage = 1
      this.goodsList = []
      this.finished = false
      await this.onLoad()
      this.refreshing = false
    },
    goodsDetail(goodsId){
      this.$router.push(`/goods-detail/${goodsId}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.product-list-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  .category-header {
    .fj();
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .icon-left {
      font-size: 25px;
      font-weight: bold;
    }
    .header-search {
      display: flex;
      width: 76%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #F7F7F7;
      .borderRadius(20px);
      .nbSearch {
        padding: 0 5px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        background: #F7F7F7;
      }
    }
    .icon-More {
      font-size: 20px;
    }
    .search-btn {
      height: 28px;
      margin: 8px 0;
      line-height: 28px;
      padding: 0 5px;
      color: #fff;
      background: @primary;
      .borderRadius(5px);
      margin-top: 10px;
    }
  }
}
.product-list-refresh {
  margin-top: 78px;
  .product-item {
    .fj();
    width: 100%;
    height: 120px;
    padding: 10px 0;
    border-bottom: 1px solid #dcdcdc;
    img {
      width: 140px;
      height: 120px;
      padding: 0 10px;
      .boxSizing();
    }
    .product-info {
      width: 56%;
      height: 120px;
      padding: 5px;
      text-align: left;
      .boxSizing();
      p {
        margin: 0
      }
      .name {
        width: 100%;
        max-height: 40px;
        line-height: 20px;
        font-size: 15px;
        color: #333;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .subtitle {
        width: 100%;
        max-height: 20px;
        padding: 10px 0;
        line-height: 25px;
        font-size: 13px;
        color: #999;
        overflow: hidden;
      }
      .price {
        color: @primary;
        font-size: 16px;
      }
    }
  }
}
</style>
