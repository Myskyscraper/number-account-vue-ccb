<template>
  <div id="upLoadId">
    <p>请上传您的第二代居民身份证原件</p>

    <div class="frontIdCard idCardBox" @click="takePhoto">
      身份证上传人脸
      <img :src="frontImgUrl" alt />
    </div>

    <div class="backIdCard idCardBox" @click="takePhotoRe">
      身份证上传国徽面
      <img :src="backImgUrl" alt />
    </div>

    <van-button
      size="normal"
      plain
      round
      margin="10px"
      color="#09b6f2"
      type="number"
      class="bottomButton"
      :hairline="true"
      @click="submitData"
    >下一步</van-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      frontImg: "",
      backImg: ""
    };
  },
  computed: {
      frontImgUrl:function(){
          if(this.frontImg==""){
              return require('../../assets/images/person.png')
          }else{
               return ("data:image/png:base64,"+this.frontImg);
          }
      },
      backImgUrl:function(){
          if(this.backImg==""){
              return require('../../assets/images/country.png')
          }else{
               return ("data:image/png:base64,"+this.backImg);
          }

      }
  },
  methods: {
    takePhoto(){
      console.log("ok");
      var _this= this;
      window.WebViewJavascriptBridge.callHandler(
        "invoke",
        { action: "takePhoto", compressedSize: "300" },
        function(responseData) {
         _this.frontImg =  responseData.Data.image;
          console.log(_this.frontImg.length);
        }
      );
    },
    takePhotoRe() {
      var _this= this;
      window.WebViewJavascriptBridge.callHandler(
        "invoke",
        { action: "takePhoto", compressedSize: "300" },
        function(responseData) {
          _this.backImg =  responseData.Data.image;
        
          console.log(_this.backImg.length);
        }
      );
    },
    submitData() {
     console.log(this.$store.state.initData);
      var _this = this;
      if (this.$ccbskObj.isnull(_this.frontImg)) {
        Dialog.alert({ message: "请拍摄身份证正面照" });
        return;
      } else if (this.$ccbskObj.isnull(_this.backImg)) {
        Dialog.alert({ message: "请拍摄身份证国徽面" });
        return;
      } else {
        let params = {
            Digt_Acc_Ar_ID:this.$store.state.initData.Digt_Acc_Ar_ID,
            Prtn_Chnl_ID: this.$store.state.initData.Prtn_Chnl_ID, //合作方渠道编号
            Prtn_Mbsh_ID: this.$store.state.initData.Prtn_Mbsh_ID, //合作方会员编号
            MblPh_No:this.$store.state.initData.mblphNo,
            IDCard_No:this.$store.state.initData.IDCard_No,
            FRONT_INFO:{
                base64_Pic_Txn_Inf:this.frontImg
            },
            OPPOSITE_INFO:{
                 base64_Pic_Txn_Inf:this.backImg
            }
        };
         console.log("发送c104参数", params);
        this.$http(
          "/LifeSvc/DigtAccWlt/DAWDightAccOCRId",
          "P5OISC104",
          params,
          true,
          true
        )
          .then(res => {
            console.log("返回c104参数", res);
            this.$store.commit(
              "DataC104_Change",
               res
            );
             this.$router.push({ path:'./openVerifcode'});
          })
          .catch(err => {
            console.log("数据请求失败", err);
          });
      }
    }
  }
};
</script>

<style>
* {
  font-size: 14px;
}
.idCardBox {
  width: 80%;
  height: 160px;
  margin: 10px auto;
  border: 1px solid #666;
  text-align: center;
  line-height: 80px;
  position: relative;
}

.idCardBox img {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 2;
}
</style>