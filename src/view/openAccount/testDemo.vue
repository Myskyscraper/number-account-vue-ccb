<template>
  <div id="test">
 

    <div @click="show">hahhahha</div>
    <p>{{testDemo}}</p>

    <van-field
      readonly
      clickable
      label="银行"
      :value="testDemo"
      placeholder="请输入银行"
      
    />
  </div>
</template>

<script>
let str;
export default {
  data() {
    return {
      bank_account: "",
      display_bank_account: "",
      testDemo: "gagggagagag"
    };
  },
  created() {
    this.initData();
  },
  methods: {
   
    initData() {
      if (false) {
        str = 1;
      } else {
        str = 2;
      }
      this.testDemo = this.$store.state.data1010.IssuBnk_Nm;
    },
    show() {
      console.log(str);
    }
  }
};
</script>

<style>
* {
  font-size: 18px;
}
</style>



  



