<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ObserveDom from '@better-scroll/observe-dom'
BScroll.use(ObserveDom)
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            // 当type是对象或者数组时，default必须是函数
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        // 1.创建BScroll对象
        // 拿到当前组件内的ref名字为wrapper的元素
        this.scroll=new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            click:true,
            pullUpLoad:this.pullUpLoad,
           observeDOM:true,
        //    observeImage:true,
            // observeImage:{debounceTime:300}

        })
        // 2.监听滚动的位置
        this.scroll.on('scroll',position=>{
            this.$emit('scroll',position)
        })
        // 3.监听上拉事件
        // this.scroll.on('pullingUp',()=>{
        //     this.$emit('pullingUp')
            
        // })
        // 3.监听滚动到底部
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp');
            })
        }
    },
    methods:{
        refresh(){
            // console.log('-----');
            this.scroll&&this.scroll.refresh()
        },
        finishPullUp(){
            this.scroll&&this.scroll.finishPullUp()
        },
        getScrollY(){
            return this.scroll?this.scroll.y:0
        }
    }
}


</script>

<style>

</style>