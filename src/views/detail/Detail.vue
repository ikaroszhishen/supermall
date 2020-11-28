<!--  -->
<template>
  <div class='detail'>
    <detail-nav-bar class="detail-nav">
    </detail-nav-bar>
    <scroll class="content" ref="scroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-goods :goods="goods"></detail-goods>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @loadImgEvent="loadImgEvent"></detail-goods-info>
    <param-info :param-info="paramInfo"></param-info>
    <detail-comment :comment="comment"></detail-comment>
    <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
 import DetailNavBar from './childComps/DetailNavBar'
 import DetailSwiper from './childComps/DetailSwiper'
 import DetailGoods from './childComps/DetailGoods'
 import DetailShopInfo from './childComps/DetailShopInfo'
 import Scroll from 'components/common/scroll/Scroll'
 import DetailGoodsInfo from './childComps/DetailGoodsInfo'
 import ParamInfo from './childComps/DetailParams'
 import DetailComment from './childComps/DetailComment'
 import GoodsList from 'components/content/goods/GoodsList'
 
 import {getDetail, Goods, Shop, GoodsParam,getRecommend} from 'network/detail'
 import {debounce} from 'common/utils'
 import {itemListenerMixin} from 'common/mixin'
export default {
  //import引入的组件需要注入到对象中才能使用
  name : 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoods,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    ParamInfo,
    DetailComment,
    GoodsList
  },
  mixins: [itemListenerMixin],
  data() {
  //这里存放数据
  return {
    iid: null,
    topImages: [],
    goods : {},
    shop : {},
    detailInfo : {},
    paramInfo : {},
    comment : {},
    recommends : [],
  };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    loadImgEvent(){
      this.$refs.scroll.refresh()
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      //1.获取顶部的图片轮播数据
      const result = res.result
      this.topImages = result.itemInfo.topImages
          //2.获取商品信息
      this.goods = new Goods(result.itemInfo,result.columns,result.shopInfo.services)
        //3.获取店铺信息
      this.shop = new Shop(result.shopInfo)
       //4.保存商品的详情数据
       this.detailInfo = result.detailInfo
      //5.获取参数信息
      this.paramInfo = new GoodsParam(result.itemParams.info,result.itemParams.rule)
      //6.取出评论信息
      if (result.rate.cRate != 0) {
          this.comment = result.rate.list[0];
        }
    }),
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style scoped>
 .detail{
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }
 .content{
   height: calc(100% - 44px);
 }
 .detail-nav{
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
</style>