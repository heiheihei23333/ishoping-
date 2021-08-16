<template>
  <div id="shop-item">
    <div class="item-shopname">{{itemInfo.shopname}}</div>
    <div class="item">
      <div class="item-selector">
        <!-- @checkBtnClick="checkedChange" v-model="itemInfo.checked" -->
      <check-button :is-checked="itemInfo.checked" @click.native="checkClick"></check-button>
      </div>
      <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
      </div>
      <div class="item-info">
        <div class="item-title">{{itemInfo.title}}</div>
        <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
        <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
    </div>
  </div>
  
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
name:'CartListItem',
components:{
 CheckButton
},
props:{
    itemInfo: {
        type:Object,
        defaule(){
            return {}
        }
    },
    shop:{
      type:Object,
        defaule(){
            return {}
        }
    }
},
methods:{
    checkClick(){
        this.itemInfo.checked=!this.itemInfo.checked
    }
}
}
</script>

<style>
.item-shopname{
  padding: 10px 0 5px 36px;
  color: black;
  font-size: 15px;
}
#shop-item {
    width: 95%;
    background-color: #fff;
    margin: 0 auto 8px;
    border-radius: 12px;
  }
  .item{
    display: flex;
    font-size: 0;
    padding: 5px;
    /* border-bottom: 1px solid #ccc; */
  }
  

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px 0 3px;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 13px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 12px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 5px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
      font-size: 19px;
    color: orangered;
    position: relative;
      bottom: -7px;
      left: 0;
  }

  .item-count{
      width: 26px;
      height: 26px;
      font-size: 13px;
      border: 1px solid #aaa;
      text-align: center;
      padding-top: 4px;
      border-radius: 7px;
  }
</style>