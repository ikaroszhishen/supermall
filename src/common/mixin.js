import {debounce} from 'common/utils'
export const itemListenerMixin = {
  data(){
    return {
      itemImgListener : null
    }
  },
  mounted(){
    //1.图片加载的时间监听
    const refresh = debounce(this.$refs.scroll.refresh,50)
    //对监听的事件进行保存
    this.itemImgListener = ()=>{
     refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}