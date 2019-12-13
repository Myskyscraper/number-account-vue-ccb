<template>
  <div id="etc-contract">
    <van-nav-bar title="补充个人身份信息" left-arrow @click-left="back" />

    <div class="text">hhahahhahahahahahah龙会员页面的东西的</div>
  </div>
</template>

<script>
export default {
  methods: {
    back(){
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>

<style scoped>
   .text{
       font-size: 14px;
   }

</style>