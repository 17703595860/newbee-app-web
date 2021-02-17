<template>
  <div class="category-box">
    <SimpleHeader :show-title="false">
      <template slot="center">
        <div class="header-search">
          <i class="nbicon nbSearch"></i>
          <router-link tag="span" class="search-title" to="/search-list">全场50元起步</router-link>
        </div>
      </template>
    </SimpleHeader>
    <div class="search-wrap" ref="searchWrap">
      <list-scroll :scroll-data="categoryList" class="nav-side-wrapper">
        <ul class="nav-side">
          <li
              v-for="item in categoryList"
              :key="item.categoryId"
              v-text="item.categoryName"
              :class="{'active' : currentIndex == item.categoryId}"
              @click="selectMenu(item.categoryId)"
          ></li>
        </ul>
      </list-scroll>
      <div class="search-content">
        <list-scroll :scroll-data="categoryRightList" >
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <template v-for="(category, index) in categoryRightList">
                <div class="swiper-slide" :key="index">
                  <!-- <img class="category-main-img" :src="category.mainImgUrl" v-if="category.mainImgUrl"/> -->
                  <div class="category-list" v-for="(products, index) in category.children" :key="index">
                    <p class="catogory-title">{{products.categoryName}}</p>
                    <div class="product-item" v-for="(product, index) in products.children" :key="index" @click="searchGooods(product.categoryId)">
                      <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" class="product-img"/>
                      <p v-text="product.categoryName" class="product-title"></p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </list-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import category from "@/api/category";
import ListScroll from "@/components/ListScroll";
import SimpleHeader from "@/components/SimpleHeader";

export default {
  name: "Category",
  // eslint-disable-next-line vue/no-unused-components
  components: { ListScroll, SimpleHeader },
  data() {
    return {
      categoryList: [],
      categoryRightList: [],
      currentIndex: null
    }
  },
  async mounted() {
    this.setWrapHeight()
    this.initData()
  },
  watch: {

  },
  methods: {
    goHome () {
      this.$router.push({ path: 'home' })
    },
    async initData() {
      const {data} = await category.getAll()
      console.log(data)
      this.categoryList = data
      this.currentIndex = data[0].categoryId
      this.categoryRightList = data.filter(e => e.categoryId === this.currentIndex)
    },
    selectMenu(index) {
      this.currentIndex = index
      this.categoryRightList = this.categoryList.filter(e => e.categoryId === this.currentIndex)
    },
    setWrapHeight() {
      // 设置视口高度
      let $screenHeight = document.documentElement.clientHeight
      this.$refs.searchWrap.style.height = $screenHeight - 100 + 'px'
    },
    searchGooods(categoryId){
      this.$router.push({ name: 'searchList', params: {
          categoryId: categoryId
      }})
    }
  }
}
</script>

<style lang="less">
@import '../common/style/mixin';
.category-box {
  .simple-header-box {
    .wh(100%, 50px);
    line-height: 50px;
    box-sizing: border-box;
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    overflow: hidden;

    .header-search {
      display: flex;
      width: 80%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #F7F7F7;
      border-radius: 20px;
      .nbSearch {
        padding: 0 10px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
      }
      span{
        width: auto;
      }
    }
  }

  .search-wrap {
    .fj();
    width: 100%;
    margin-top: 50px;
    background: #F8F8F8;
    border-top: 1px solid #999;
    .nav-side-wrapper {
      width: 28%;
      height: 100%;
      overflow: hidden;
      .nav-side {
        width: 100%;
        .boxSizing();
        background: #F8F8F8;
        li {
          width: 100%;
          height: 56px;
          text-align: center;
          line-height: 56px;
          font-size: 14px;
          &.active {
            color: @primary;
            background: #fff;
          }
        }
      }
    }
    .search-content {
      width: 72%;
      height: 100%;
      padding: 0 10px;
      background: #fff;
      .boxSizing();
      .swiper-container {
        width: 100%;
        .swiper-slide {
          width: 100%;
          .category-main-img {
            width: 100%;
          }
          .category-list {
            display: flex;
            flex-wrap: wrap;
            flex-shrink: 0;
            width: 100%;
            .catogory-title {
              width: 100%;
              font-size: 17px;
              font-weight: 500;
              padding: 10px 0 20px;
            }
            .product-item {
              width: 33.3333%;
              margin-bottom: 10px;
              text-align: center;
              font-size: 15px;
              .product-img {
                .wh(30px, 30px);
              }
            }
          }
        }
      }
    }
  }
}
</style>
