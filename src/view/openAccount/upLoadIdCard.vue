<template>
  <div id="upLoadId">
    <van-nav-bar title="上传身份证" left-arrow @click-left="back" />

    <div class="up-load-file">
      请上传第二代身份证号原件
    </div>
    
    <div class="frontIdCard idCardBox" @click="takePhoto">
      身份证上传人脸
      <img :src="frontImgUrl" alt />
    </div>

    <div style="height:10px;">
      
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
      backImg: "",
      testSrc:'../../assets/images/person.png'
    };
  },
  computed: {
      frontImgUrl:function(){
          if(this.frontImg==""){
              return require('../../assets/images/person.png');
          }else{
               let imgSrcA = "data:image/png;base64,"+this.frontImg;
               return require(imgSrcA);
          }
      },
      backImgUrl:function(){
          if(this.backImg==""){
              return require('../../assets/images/country.png')
          }else{
              let imgSrcB = "data:image/png;base64,"+this.backImg;
              return require(imgSrcB);
          }

      }
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    takePhotoTest(){
        console.log('okk');
        this.testSrc =  require();
    },
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
             this.$router.push({ path:'./addPerInfo'});
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

.up-load-file{
    text-align: center;
    line-height: 40px;
    margin-top: 30px;
    color: #09b6f2;
    font-size: 16px;
    margin-bottom: 25px;
}
</style>