<template>
<div id="home" class="wrapper">
  <nav-bar class="home-nav"><div slot="center">爱购物</div></nav-bar>
      <tab-control :titles="['流行','新款','精选']" 
         @tabClick="tabClick"
         ref="tabControl1"
         class="tab-control" v-show="isTabFixed"/>
      <scroll class="content" 
      ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <!-- @pullingUp="loadMore" -->
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <!-- :recommends="recommends右面的是父组件名字 -->
        <feature-view/>
        <tab-control :titles="['流行','新款','精选']" 
         @tabClick="tabClick"
         ref="tabControl2"/>
        <good-list :goods="goods[currentType].list"/>
      </scroll> 
      <back-top @click.native="backTop" v-show="isShowBackTop"/>
</div>
</template>

<script>
// 切换分类报错可能是scroll.refresh没加&
// 子组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView.vue'
// 别的文件夹下的组件
import NavBar from '../../components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import GoodList from '../../components/content/goods/GoodList.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import {getHomeMultiData,getHomeGoods} from '../../network/home'
// import {getHomeGoods} from '../../network/request'
import BackTop from '../../components/content/backTop/BackTop.vue'
import {debounce} from '../../common/utils.js'

export default {
name:'Home',
components:{
  NavBar,
  HomeSwiper,
  RecommendView,
  FeatureView,
  TabControl,
   GoodList,
   Scroll,
   BackTop
},
data(){
  return{
    //防止getHomeMultiData调用后里面的参数被销毁，保存一下
    banners:[],
    recommends:[],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]},
    },
    currentType:'pop',
    isShowBackTop:false,
    tabOffsetTop:0,
    isTabFixed:false,
    saveY:0
  }
},
activated(){
  // this.$refs.scroll.scroll.scrollTo(0,this.saveY,1)
  // this.$refs.scroll.refresh()
  this.$refs.scroll.refresh()
  this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
  
  // console.log(this.saveY);
},
deactivated(){
  // 保存Y值
  this.saveY=this.$refs.scroll.getScrollY()
  // console.log(this.saveY);
},
created(){
  this.getHomeMultiData()
  // 请求商品数据,调用methods里的方法
  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')
},
mounted(){
  // 监听item中图片加载完成
  const refresh = debounce(this.$refs.scroll.refresh,50)
  this.$bus.$on('itemImageLoad',()=>{
    //  console.log('--------');
    refresh()
  })
},
methods:{
  // 事件监听相关的方法
  loadMore(){
    this.getHomeGoods(this.currentType)
  },
  tabClick(index){
    switch(index){
      case 0:
        this.currentType='pop'
        break
      case 1: 
        this.currentType='new'
        break
      case 2: 
        this.currentType='sell'
        break
    }
    // 让两个TabControl的currentIndex保持一致
    this.$refs.tabControl1.currentIndex=index;
    this.$refs.tabControl2.currentIndex=index;
  },
  backTop(){
    // this.$refs.scroll.拿到scroll组件,括号里第三个参数为多少时间回到顶部
    this.$refs.scroll.scroll.scrollTo(0,0,500)
    console.log('haha');
  },
  contentScroll(position){
    // 判断backtop是否显示
    this.isShowBackTop=-position.y>1000
    // 决定tabcontrol是否吸顶（position：fixed）
    this.isTabFixed=-position.y>this.tabOffsetTop
  },
  swiperImageLoad(){
    // 获取tabControl的offsetTop
  // 所有的组件都有一个属性$el,用于获取组件中的元素
    this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
  },
  // loadMore(){
  //   this.getHomeGoods(this.currentType)
  //   // 解决上拉加载更多一小段时间不能滚动的问题
  //  this.$refs.scroll.scroll.refresh()
  // },
  // 网络请求相关方法
  //1.请求多个数据 
  getHomeMultiData(){
    // 这里的getHomeMultiData()方法是从network中导入的
   getHomeMultiData().then(res=>{
    //console.log(res);
    //this.result=res;
    this.banners=res.data.banner.list
    this.recommends=res.data.recommend.list
    })
  },
  getHomeGoods(type){
    const page=this.goods[type].page+1
    getHomeGoods(type,page).then(res=>{
      // console.log(res.data.list);
      this.goods[type].list.push(...res.data.list) 
      this.goods[type].page+=1;
      // 完成上拉加载更多
       this.$refs.scroll.finishPullUp()
  })
  },
}
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  /* width: 100%; */
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不跟随滚动 */
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
  /* height: calc(100% - 93px) ;
  margin-top: 44px; */
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
