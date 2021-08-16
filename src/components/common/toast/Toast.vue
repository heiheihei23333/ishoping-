<template>
  <div class="toast" v-show="show">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
name:'Toast',
props:{
    // message:{
    //     type:String,
    //     default:''
    // },
    // show:{
    //     type:Boolean,
    //     default:false
    // }
},
data(){
    return{
        message:'',
        show:false
    }
},
methods:{
    showMessage(message,duration){
        this.show=true;
        this.message=message;

        setTimeout(()=>{
        this.show=false;
        this.message='';
      },duration)
    }
}
}
</script>

<style scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    color: #fff;
    background-color: rgba(0, 0, 0, .5);
    z-index: 99;
    border-radius: 12px;
}
</style>