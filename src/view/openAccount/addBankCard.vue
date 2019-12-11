<template>
  <div>
    <van-nav-bar title="添加银行卡" left-arrow @click-left="back" />
    <van-cell-group>
      <!-- <van-field v-model="bankCardNo" label="银行卡" placeholder="请输入银行卡号" type="tel" /> -->
         

           <div class="bank-wrap-box">

              <span>
                  银行卡
              </span>

              <input 
                type="text"
                placeholder="请输入银行卡号" 
                :value="display_bank_account" 
                @input="handleBankCardInput"
              />

           </div>
    </van-cell-group>

    <van-button
      size="normal"
      plain
      round
      margin="10px"
      color="#09b6f2"
      type="number"
      class="bottomButton"
      :hairline="true"
      :disabled="checkCanClick"
      @click="nextStep"
    >下一步</van-button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      canFlag: true,
      bank_account:"",
      display_bank_account:""
    };
  },
  created() {
      this.initData();
  },
  computed: {
    checkCanClick: function() {
      if (this.bank_account.length > 16 && this.bank_account.length < 24) {
        return (this.canFlag = false);
      } else {
        return (this.canFlag = true);
      }
    },
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    initData() {
      var _this = this;
      console.log("打印c100的数据", this.$store.state.dataC100.Data);
      if (
        this.$ccbskObj.isnull(_this.$store.state.dataC100.Data.Digt_Acc_Ar_ID)
      ) {
        this.partnerRegistra();
      }
    },
    handleBankCardInput(e) {
      this.bank_account = e.target.value;
      this.display_bank_account = this.bank_account.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    },
    partnerRegistra() {
      var _this = this;
      if (this.$ccbskObj.isnull(_this.$store.state.initData.mblphNo)) {
        let errorcode = "";
        let errorDesc = "您的手机号为空，不能开通零钱卡，请完善个人信息后重试";
        router.push({
          path: "/loadErr",
          query: {
            rspCdDsc: "",
            rqs_Jrnl_No: "",
            rspInf: errorDesc
          }
        });
      }

      let params = {
        Prtn_Chnl_ID: this.$store.state.initData.Prtn_Chnl_ID, //合作方渠道编号
        Prtn_Mbsh_ID: this.$store.state.initData.Prtn_Mbsh_ID, //合作方会员编号
        Land_TpCd: "DL001",
        LgnID: this.$store.state.initData.mblphNo, //手机号
        Digt_Acc_Mbsh_TpCd: "01"
      };
      console.log("发送c001参数", params);
      this.$http(
        "/LifeSvc/AppUsrInfAcsDgtlAcctSvc/UIADPrvtUsrRqst",
        "P5OISC001",
        params,
        true,
        true
      )
        .then(res => {
          console.log("返回c001参数", res);
          this.$store.commit(
            "DataC100_Digt_Acc_Ar_ID_Change",
            res.Data.Digt_Acc_Ar_ID
          );
        })
        .catch(err => {
          console.log("数据请求失败", err);
        });
    },
    nextStep() {
      console.log("下一步");
      let params = {
        DbCrd_CardNo: this.bank_account.replace(/\s*/g,'')
      };
      console.log("返回1010参数", params);
      this.$http(
        "/LifeSvc/DigtAccWlt/DAWDigtAccCardNbgInfEnqr",
        "P5OIS1010",
        params,
        true,
        true
      )
        .then(res => {
          console.log("返回1010参数", res);
          this.$store.commit("Data1010_Change", res); //存下1010数据
          let bankType = res.Data.BnkCD.slice(0, 3);
          this.$store.commit("bankType_change", bankType);
          if (bankType == "105") {
            this.$router.push({
              path: "./addPerInfo",
              query: {
                bankType: bankType ? bankType : ""
              },
              meta:{
                keepAlive:true
              }
            });
          } else {
            this.$router.push({
              path: "/upLoadIdCard",
              query: {
                bankType: bankType ? bankType : ""
              },
               meta:{
                keepAlive:true
              }
            });
          }
        })
        .catch(err => {
          console.log("数据请求失败", err);
        });
    }
  }
};
</script>

<style scoped>
  .bank-wrap-box{
    height: 44px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
  }

   .bank-wrap-box span{
     width: 72px;
     padding-left:20px; 
   }

    .bank-wrap-box input{
      flex: 1;
    }

</style>