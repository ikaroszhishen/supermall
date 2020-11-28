<!--  -->
<template>
  <div class='wrapper' ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll, { PullUpLoad } from 'better-scroll'
export default {
  name : 'Scroll',
  props : {
    probeType: {
      type : Number,
      default : 0
    },
    pullUpLoad: {
      type : Boolean,
      default : false
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
  //这里存放数据
  return {
    scroll : null
  };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
      click : true,
      probeType : this.probeType,
      pullUpLoad : this.pullUpLoad
    })
    //2.监听滚动的位置
    if(this.probeType ===2 || this.probeType ===3){
      this.scroll.on('scroll',(position)=>{
        // console.log(position);
        this.$emit('scroll',position)
      })
    }
    //3.监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
    }
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {

  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style scoped>


</style>