<template>
  <div id="test">

      <van-nav-bar title="补充个人身份信息" left-arrow @click-left="back" />

   
            <input type="text" name="" id="">
     

    <div>
            <router-link to="./addPerInfo"> 跳转到个人信息页面</router-link>
    </div>

    <div @click="link">
        测试事件
    </div>

            
      

      

  </div>
</template>

<script>
let str;
export default {
  data() {
    return {
     
    };
  },
  created() {
    
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    link(){
        this.$router.push({
              path: "./addPerInfo",
              meta:{
                keepAlive:true
              }
            });
    }
    
  }
};
</script>

<style scoped>
* {
  font-size: 18px;
}
input{
  border: 1px solid red;
}
</style>



  



