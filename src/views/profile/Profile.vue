<template>
<div class="personal">
  <nav-bar class="person-nav"><div slot="center">我的</div></nav-bar>
  <div class="introduction">
    <div class="touxiang"><img src="../../assets/img/profile/avatar.svg" alt=""></div>
    <div class="message">
      <div class="login">
        <span><a href="#">登录</a></span>
        <span>/</span>
        <span><a href="#">注册</a></span>
      </div>     
      <div class="fensi">
        <span>关注21</span>
        <span> | </span>
        <span>粉丝0</span>
      </div>
    </div>
  </div>
  <ul class="money">
    <li class="yue">
      <div>
        <span>0.00</span>
        <span>元</span>
      </div> 
      <div>我的余额</div>
    </li>
    <li class="youhui">
      <div>
        <span>0</span>
        <span>个</span>
      </div>
      <div>我的优惠</div>
    </li>
    <li class="jifen">
      <div>
        <span>0</span>
        <span>分</span>
      </div>
      <div>我的积分</div>
    </li>
  </ul>
  <div class="content1">
    <div>
      <a href="#">
        <img src="../../assets/img/profile/message.svg" alt="">
        <span>我的消息</span>
      </a>
    </div>
    <div class="jifenmarket">
      <a href="#">
        <img src="../../assets/img/profile/pointer.svg" alt="">
        <span>积分商城</span>
      </a>
    </div>
    <div>
      <a href="#">
        <img src="../../assets/img/profile/vip.svg" alt="">
        <span>会员卡</span>
      </a>
    </div>
  </div>
  <div class="content2">
    <div class="mymarket">
      <a href="#">
        <img src="../../assets/img/profile/cart.svg" alt="">
        <span>我的购物车</span>
      </a>
    </div>
    <div>
      <a href="#">
        <img src="../../assets/img/profile/shopping.svg" alt="">
        <span>下载购物APP</span>
      </a>
    </div>

  </div>

</div>
  
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
export default {
name:'Profile',
components:{
  NavBar
}
}
</script>

<style scoped>
.person-nav{
  background-color: var(--color-tint);
  color: #fff;
}
.introduction{
  display: flex;
  background-color: var(--color-tint);
  height: 90px;
  padding: 0 15px;
  align-items: center;
}
.introduction .touxiang img{
 width: 70px;
 height: 70px;
}
.message{
  height: 45px;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  margin-left: 15px;

}
.message span{
  color: #fff;
}
.message span a{
  color: #fff;
}
.message .login{
  flex: 1;
}
.messgae .fensi{
  flex: 1;

}
.money{
  display: flex;
  height: 100px;
  border-bottom: 15px solid #eee;
}
 .money li{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  justify-content: center;
  
}
.money li :first-child{
  margin-bottom:5px ;
}
.money li :first-child :first-child{
  color: orangered;
  font-size: 25px;
} 


.money .youhui{
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.content1{
  display: flex;
  flex-direction: column;
  height: 150px;
  border-bottom: 15px solid #eee;
  padding-left: 20px;
}
.content2{
  display: flex;
  flex-direction: column;
  height: 100px;
  padding-left: 20px;
}
.content1>div,.content2>div{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.content1>div a,.content2>div a{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.content1>div a span,.content2>div a span{
  margin-left: 10px;
}
.jifenmarket{
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.mymarket{
  border-bottom: 1px solid #eee;
}
.content1 img,.content2 img{
  /* display: block; */
  
  width: 20px;
  height: 20px;
  line-height: 50px;
}
</style>