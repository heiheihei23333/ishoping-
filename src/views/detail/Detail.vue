<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info  ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info  ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list  ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
    <!-- <toast/> -->
    
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from '../../components/common/scroll/Scroll.vue'
import GoodsList from '../../components/content/goods/GoodList.vue'
import BackTop from '../../components/content/backTop/BackTop.vue'
// import Toast from '../../components/common/toast/Toast.vue'

import {getDetail,GoodsInfo,Shop,GoodsParam,getRecommend} from '../../network/detail'
import { debounce } from '../../common/utils'
import {mapActions} from 'vuex'

export default {
name:'Detail',
components:{
  DetailNavBar,
  DetailSwiper,
  DetailBaseInfo,
  DetailShopInfo,
  Scroll,
  DetailGoodsInfo,
  DetailParamInfo,
  DetailCommentInfo,
  GoodsList,
  DetailBottomBar,
  BackTop,
  // Toast
},
data(){
  return {
    iid:null,
    topImages:[],
    goods:{},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[],
    themeTopYs:[0,1000,2000,3000,Number.MAX_VALUE],
    getThemeTopY:null,
    currentIndex:0,
    isShowBackTop:false,
    // message:'',
    // show:false
  }
},
created(){
  // 1.保存存入的iid
  this.iid=this.$route.params.iid
  // 2.根据iid请求详情数据
  getDetail(this.iid).then(res=>{
    // 1.获取顶部的图片轮播数据
    // console.log(res);
    const data = res.result;
    this.topImages=res.result.itemInfo.topImages
    // 2.获取商品信息
    this.goods=new GoodsInfo(data.itemInfo,data.columns, data.shopInfo.services)
    // 3.创建店铺信息的对象
    this.shop=new Shop(data.shopInfo)
    // 4.保存商品的详情数据
    this.detailInfo=data.detailInfo
    // 获取参数信息
    this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
    // 取出评论信息
    if(data.rate.cRate!==0){
      this.commentInfo=data.rate.list[0]

    }
    // 请求推荐数据
    getRecommend().then(res=>{
      console.log(res);
      this.recommends=res.data.list
    })
    // 给getThemeTopY赋值(对this.themeTopYs的赋值操作进行防抖)
    this.getThemeTopY=debounce(()=>{
      this.themeTopYs=[]
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    this.themeTopYs.push(Number.MAX_VALUE)
    console.log(this.themeTopYs);
    },100)
  })
},
methods:{
  ...mapActions(['addCart']),
  imgLoad(){
    this.$refs.scroll.refresh()
    this.getThemeTopY()
  },
  titleClick(index){
    this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index]+44,200)
    // console.log(index);
  },
  contentScroll(position){
    //  console.log(position);
     const positionY=-position.y+44
    let length=this.themeTopYs.length
    for(let i=0;i<length-1;i++){
      if((this.currentIndex!==i) && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]))
      // if((this.currentIndex!==i) && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) || (i===length-1 && positionY>=this.themeTopYs[i])))
      {
      this.currentIndex=i;
      console.log(i);
      this.$refs.nav.currentIndex=this.currentIndex
      }}
      // 是否显示回到顶部
      this.isShowBackTop=-position.y>1000
    },
  backTop(){
    // this.$refs.scroll.拿到scroll组件,括号里第三个参数为多少时间回到顶部
    this.$refs.scroll.scroll.scrollTo(0,0,500)
    // console.log('haha');
  },
  addToCart(){
    // 1.获取购物车需要展示的信息
    const product={}
    product.image=this.topImages[0];
    product.title=this.goods.title;
    product.desc=this.goods.desc;
    product.price=this.goods.realPrice;
    product.iid=this.iid;
    product.shopname=this.shop.name
    // 2.将商品添加到购物车里
    this.addCart(product).then(res=>{
      // this.show=true;
      // this.message=res;

      // setTimeout(()=>{
      //   this.show=false;
      //   this.message='';
      // },1500)
      this.$toast.showMessage(res,2000)
    })
    // this.$store.dispatch('addCart',product).then(res=>{
    //   console.log(res);
    // })
    // 3.添加到购物车成功
  }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
/* 加scroll必须给高度 */
.content{
  /* 100%继承父亲高度 */
  /* 所以父亲给100vh，100%视口高度 */
  /* 100% - 44px要有空格 */
  height: calc(100% - 44px - 49px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}

</style>