<template>
  <div id="upLoadId">
    <van-nav-bar title="上传身份证" left-arrow @click-left="back" />

    <div class="up-load-file">
      请上传第二代身份证号原件
    </div>
    
    <div class="frontIdCard idCardBox" @click="takePhoto">
      身份证上传人脸
      <img :src="frontImg" />
    </div>

    <div style="height:10px;">
      
    </div>

    <div class="backIdCard idCardBox" @click="takePhotoRe">
      身份证上传国徽面
      <img :src="backImg" />
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
import { Dialog ,Toast} from 'vant';
let photoSend;
let photoreSend;
let frontFlag = true;
let backFlag = true;
export default {
  data() {
    return {
      frontImg:require('../../assets/images/person.png'),
      backImg: require('../../assets/images/country.png')
    };
  },
  computed: {
      // frontImgUrl:function(){
      //     if(this.frontImg==""){
      //         return require('../../assets/images/person.png');
      //     }else{
      //          let imgSrcA = "data:image/png;base64,"+this.frontImg;
      //          return require(imgSrcA);
      //     }
      // },
      // backImgUrl:function(){
      //     if(this.backImg==""){
      //         return require('../../assets/images/country.png')
      //     }else{
      //         let imgSrcB = "data:image/png;base64,"+this.backImg;
      //         return require(imgSrcB);
      //     }

      // }
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    testChangeSrc(){
        console.log('okk');
        let sss = 'data:image/png;base64,'+'R0lGODlhWAAfAJEAAAAAAP////8AAGZmZiH5BAAHAP8ALAAAAABYAB8AAALfhI+py+0PX5i02ouz3rxn44XiSHJgiaYqdq7uK7bwTFtyjcN3zqd7D4wBgkTSr4i87AQCCrPCfFoG1IGIWqtabUOLNPCVfgNY8rZTzp4py+Yk7B6nL9pp3T6f3O3KLrQJ6OYlqLdGUTaHuKZYwcjHdfEUOEh4aGiW4Vi4acnZeNkGBlb5Ror5mbmVqLrISgfq9zcqO4uxmup5enuKChk56RRHqKnbmktMnDvxI1kZRbpnmZccXTittXaUtB2gzY3k/U0ULg5EXs5zjo6jvk7T7q4TGz8+T28eka+/zx9RAAA7';
        this.frontImg = sss;
    },
    takePhoto(){
      console.log("ok");
      var _this= this;
      window.WebViewJavascriptBridge.callHandler(
        "invoke",
        { action: "takePhoto", compressedSize: "300" },
        function(responseData) { 
          frontFlag = false;
          photoSend = responseData.Data.image;
         _this.frontImg ='data:image/png;base64,'+responseData.Data.image;
         
        }
      );
    },
    takePhotoRe() {
      var _this= this;
      window.WebViewJavascriptBridge.callHandler(
        "invoke",
        { action: "takePhoto", compressedSize: "300" },
        function(responseData) {
          backFlag = false;
          photoreSend = responseData.Data.image;
          _this.backImg = 'data:image/png;base64,'+responseData.Data.image;
        }
      );
    },
    submitData() {
     console.log(this.$store.state.initData);
      var _this = this;
      if (frontFlag ==true) {
        Dialog.alert({ message: "请拍摄身份证正面照" });
        return;
      } else if (backFlag ==true) {
        Dialog.alert({ message: "请拍摄身份证国徽面" });
        return;
      } else {
        let params = {
            Digt_Acc_Ar_ID:this.$store.state.initData.Digt_Acc_Ar_ID,
            Prtn_Chnl_ID: this.$store.state.initData.Prtn_Chnl_ID, //合作方渠道编号
            Prtn_Mbsh_ID: this.$store.state.initData.Prtn_Mbsh_ID, //合作方会员编号
            MblPh_No:this.$store.state.initData.mblphNo,
            IDCard_No:"",//this.$store.state.initData.IDCard_No
            FRONT_INFO:{
                base64_Pic_Txn_Inf:photoSend
            },
            OPPOSITE_INFO:{
                 base64_Pic_Txn_Inf:photoreSend
            }
        };
         console.log("发送c104参数", params);
        this.$http(
          "/LifeSvc/DigtAccWlt/DAWDigtAccOCRId",
          "P5OISC104",
          params,
          true,
          false
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
            Dialog.alert({message: err});
          });
      }
    }
  }
};
</script>

<style scoped>

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
  width: 100%;
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

.van-cell { 
    padding: 12px 16px;
}


</style>