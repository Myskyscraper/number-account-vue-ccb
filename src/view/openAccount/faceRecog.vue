<template>
  <div id="face_recog">
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
    >点击进行人脸识别</van-button>
  </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        faceRecog(){
            var dataToSDK={"Cst_Nm":"","Crdt_No":"","phone":"","CstId":"","commAuthFields":""};
            window.WebViewJavascriptBridge.callHandler('invoke',{'action':'faceIdentifyWithCstId','param':dataToSDK},function(responseData){
                if(responseData.Data.Cnp_Rslt_Ind =="SUCCESS"){
                    
                }

            })

        }   
    }
};
</script>

<style scoped>
</style>