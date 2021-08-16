<template>
  <div class="bottom-bar">
      <div class="check-content">
        <check-button 
        :is-checked="isSelectAll" 
        class="check-button" 
        @click.native="checkClick"></check-button>
        <span>全选</span>
      </div>
      <div class="price">
          合计：{{totalPrice}}
      </div>
      <div class="calculate" @click="calcClick">结算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue' 
export default {
name:'CartBottomBar',
components:{
    CheckButton
},
computed:{
    totalPrice(){
        return '￥'+ this.$store.state.cartList.filter(item=>{
            return item.checked
        }).reduce((preValue,item)=>{
            return preValue+item.price*item.count

        },0).toFixed(2)
    },
    checkLength(){
        return this.$store.state.cartList.filter(item=>
            item.checked
        ).length
    },
    isSelectAll(){
        if(this.$store.state.cartList.length===0) return false
        // 1.使用find
        return !(this.$store.state.cartList.find(item=>
            !item.checked
        ))
        // 2.使用for循环
        // for(let item of this.$store.state.cartList){
        //     if(!item.checked){
        //         return false
        //     }
        // }
        // return true

    }
},
methods:{
    checkClick(){
        if(this.isSelectAll){
            // 全部选中
            this.$store.state.cartList.forEach(item => item.checked=false);
        }else{
            // 有部分或全部不选中
            this.$store.state.cartList.forEach(item => item.checked=true);}
    },
    calcClick(){
        if(!this.isSelectAll){
            this.$toast.showMessage('您还没有选择宝贝哦！',2000)
        }
    }

}
}
</script>

<style scoped>
.bottom-bar{
    display: flex;
    position: relative;
    height: 40px;
    background-color: #fff;
    line-height: 40px;
    border-top: 1px solid #e7e7e7;
    align-items: center;
}
.check-content{
    display: flex;
    font-size: 13px;
    align-items: center;
    margin-left: 10px;
}
.check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.price{
    width: 120px;
    font-size: 14px;
    margin-left: 60px;
    padding-right: 8px;
    text-align: right;
}
.calculate{
    position: absolute;
    right: 9px;
    width: 70px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    color: #fff;
    background-color: orangered;
    border-radius: 15px;
    
}
</style>