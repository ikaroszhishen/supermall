<!--  -->
<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>

export default {
  name: 'TabBarItem',
//import引入的组件需要注入到对象中才能使用
props:{
  path: String,
  activeColor:{
    type: String,
    default: 'red'
  }
},
components: {},
data() {
//这里存放数据
return {
};
},
//监听属性 类似于data概念
computed: {
  isActive(){
    return this.$route.path.indexOf(this.path) !==-1
  },
  activeStyle(){
    return this.isActive ? {color:this.activeColor} : {}
  }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  itemClick(){
    return this.$router.replace(this.path)
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
  .tab-bar-item{
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle; /* 去除图片下面的空格 */
    margin-bottom: 2px;
  }
  .active{
    color: red;
  }
</style>