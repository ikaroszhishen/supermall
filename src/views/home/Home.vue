<!--  -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
  <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1" class="tab-control" v-show="isTabFixed"
    ></tab-control>
  <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScoll" 
    :pull-up-load="true"
    @pullingUp="loadMore" >
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl2"
    ></tab-control>
    <goods-list :goods = "showGoods"></goods-list>
  </scroll>
  <back-top  v-show="isShowBackTop" @click.native="backClick"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from "network/home"
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'
export default {
  //import引入的组件需要注入到对象中才能使用

  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    //这里存放数据
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType : 'pop',
      isShowBackTop : false,
      tabOffsetTop : 0,
      isTabFixed : false,
      saveY : 0,
    };
  },
  //监听属性 类似于data概念
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /* 
    事件监听相关的方法
     */
     tabClick(index){
       switch(index){
         case 0 :
           this.currentType = 'pop'
          break;
        case 1 :
          this.currentType = 'new'
          break;
        case 2 :
          this.currentType = 'sell'
          break;
       }
       this.$refs.tabControl1.currentindex = index
       this.$refs.tabControl2.currentindex = index
     },
     backClick(){
       this.$refs.scroll.scrollTo(0,0)
     },
     contentScoll(position){
       //1.判断BackScoll是否显示
       this.isShowBackTop = (-position.y) >1000
       //2.判断tabControl是否吸顶
       this.isTabFixed = (-position.y) > this.tabOffsetTop
     },
     loadMore(){
       this.getHomeGoods(this.currentType)
       this.$refs.scroll.scroll.refresh()
     },
     swiperImageLoad(){
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
     },
    /* 
    网络请求相关的方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
    getHomeGoods(type, page).then(res => {
      // console.log(res);
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1
      this.$refs.scroll.finishPullUp()
    });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 1.请求多个数据，
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    //监听item中图片的加载完成
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh(  )
  }, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
  },
  destroyed() {
  }, //生命周期 - 销毁完成
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
