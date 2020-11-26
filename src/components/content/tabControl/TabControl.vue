<!--  -->
<template>
  <div class='tab-control'>
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{active: index ===currentindex}" @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name : 'TabControl',
  props : {
    titles : {
      type : Array,
      defalut(){
        return []
      }
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
  //这里存放数据
  return {
    currentindex : 0
  };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    itemclick(index){
      this.currentindex = index
      this.$emit('tabClick',index)
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
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    z-index: 9;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text)
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>