<template>
  <div id="open_verifCode">
    <van-nav-bar title="手机验证码" left-arrow @click-left="back" />
    <div class="vercode">
      <div class="vercode_left">
        <span>验证码</span>
        <input type="text" maxlength="6" placeholder="请输入验证码" v-model="verCodeNo" />
      </div>
      <div class="vercode_right" @click="verificationRun">{{verCodeText}}</div>
    </div>

    <van-button
      type="primary"
      size="normal"
      plain
      round
      margin="10px"
      color="#09b6f2"
      class="bottomButton"
      :hairline="true"
      :disabled="verCodeNo.length<6"
      @click="configFn"
    >确定</van-button>
  </div>
</template>

<script>
import { Dialog ,Toast} from 'vant'
let wkCrdt_AvlDt_StDt,wkCrdt_AvlDt_EdDt,wkGnd_Cd,wkEthnct_Cd,wkDtl_Adr_Cntnt,wkCrdHldr_Crdt_No,wkCrdHldr_Nm,wkMblPh_No;
let custId,custName,custMobie,custGend,cust_CntyAndDstc_Cd,cust_urbnCd,custIdstart,custIdend,custNation,custAddress,custProvAtnmsRgonCd;
let custUrbnCd,custCntyAndDstcCd;
export default {
  data() {
    return {
      timeNum: 60,
      disabled: true,
      verCodeNo: ""
    };
  },
  computed: {
    //处理倒计时
    verCodeText: function() {
      return this.timeNum > 59
        ? "重新发送"
        : "(" + this.timeNum + ")s后重新发送";
    }
  },
  created () {
    this.initParamBeforCall102();
  },
  mounted() {
    this.verificationRun();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    initData(){
        
    },
    initParamBeforCall102(){
        var _this= this;
        let objDataC101 = this.$store.state.dataC101;
        let objDataBasicInfo = this.$store.state.dataFillBasicInfo;
        let objDataC104 = this.$store.state.dataC104;

        wkCrdHldr_No = this.nvl(objDataC101.Data.CrdHldr_Crdt_No,objDataBasicInfo.CrdHldr_Crdt_No);
        wkCrdHldr_Nm = this.nvl(objDataC101.Data.CrdHldr_Nm,objDataBasicInfo.CrdHldr_Crdt_Nm);
        wkMblPh_No  = this.nvl(objDataC101.Data.MblPh_No,objDataBasicInfo.MblPh_No);

        if(this.$ccbskObj.isnull(objDataC101.Data.Gnd_Cd)){
            wkGnd_Cd=this.getGenderCodeByValue(objDataC104.Data.Gnd);
        }else{
            wkGnd_Cd = objDataC101.Data.Gnd_Cd;
        }
        if(this.$ccbskObj.isnull(objDataC104)){
            wkCrdt_AvlDt_StDt = objDataC101.Data.Crdt_AvlDt_StDt;
            wkCrdt_AvlDt_EdDt = objDataC101.Data.Crdt_AvlDt_EdDt;
            wkEthnct_Cd = objDataC101.Data.Ethnct_Cd;
            wkDtl_Adr_Cntnt = objDataC101.Data.Dtl_Adr_Cntnt;
        }else{
            wkCrdt_AvlDt_StDt = this.nvl(objDataC101.Data.Crdt_AvlDt_StDt,objDataC104.Data.Crdt_AvlDt_StDt);
            wkCrdt_AvlDt_EdDt = this.nvl(objDataC101.Data.Crdt_AvlDt_EdDt,objDataC104.Data.Crdt_AvlDt_EdDt);
            wkEthnct_Cd = this.nvl(objDataC101.Data.Ethnct_Cd,objDataC104.Data.Ethnct_Cd);
            wkDtl_Adr_Cntnt = this.nvl(objDataC101.Data.Dtl_Adr_Cntnt,objDataC104.Data.JIZZ);
        }

        this.sendC102();

    },
    initParamBeforCall103(objc102){
       var _this = this;
       let objDataC101 = this.$store.state.dataC101;
       let objDataC104 = this.$store.state.dataC104;
       custId = this.nvl(objc102.Data.CrdHldr_Crdt_No,objDataC101.Data.CrdHldr_Crdt_No);
       custName = this.nvl(objc102.Data.CrdHldr_Nm,objDataC101.Data.CrdHldr_Nm);
       custMobie = this.nvl(objc102.Data.MblPh_No,objDataC101.Data.MblPh_No);

        if(this.$ccbskObj.isnull(objc102.Gnd_Cd)){
            custGend = objDataC104.Data.Urbn_Cd;
        }else{
            custGend =  objc102.Data.Urbn_Cd;
        }

        if(this.$ccbskObj.isnull(objDataC104)){
            custIdstart = objc102.Data.Crdt_AvlDt_StDt;
            custIdend = objc102.Data.Crdt_AvlDt_EdDt;
            custNation = objc102.Ethnct_Cd;
            custAddress = objc102.Dtl_Adr_Cntnt;
        }else{
            custIdstart = this.nvl(objc102.Data.Crdt_AvlDt_StDt,objDataC104.Data.Crdt_AvlDt_StDt);
            custIdend =  this.nvl(objc102.Data.Crdt_AvlDt_EdDt,objDataC104.Data.Crdt_AvlDt_EdDt);
            custNation = this.nvl(objc102.Data.Ethnct_Cd,objDataC104.Data.Ethnct_Cd);
            custAddress = this.nvl(objc102.Data.Dtl_Adr_Cntnt,objDataC104.Data.Dtl_Adr_Cntnt);
        }

         _this.sendC103();
    },
    sendC102(){
        var _this = this;
        let params ={
          "Digt_Acc_Ar_ID":'',
          "Prtn_Chnl_ID": this.$store.state.initData.Prtn_Chnl_ID, //合作方渠道编号
          "Prtn_Mbsh_ID": this.$store.state.initData.Prtn_Mbsh_ID, //合作方会员编号
          "CntprtAcc":this.$store.state.data1010.Data.CntprtAcc,//对方账号
          "BnkCD":this.$store.state.data1010.Data.BnkCD,//联行号
          "IssuBnk_Nm":this.$store.state.data1010.Data.IssuBnk_Nm,// 银行名称
          "CrdHldr_Crdt_TpCd":'1010',
          "CrdHldr_Crdt_No":wkCrdHldr_No,//持卡人证件号
          "CrdHldr_Nm":wkCrdHldr_Nm,//持卡人证件姓名
          "MblPh_No":wkMblPh_No,
          "Crdt_AvlDt_StDt":wkCrdt_AvlDt_StDt,
          "Crdt_AvlDt_EdDt":wkCrdt_AvlDt_EdDt,
          "IssuCtf_Ahr_Nm":"",//发证机关名称
          "Gnd_Cd":wkGnd_Cd,
          "Nat_Cd":"156",
          "Ethnct_Cd":wkEthnct_Cd,
          "Ocp_Cd":this.$store.state.jobValueCode,//职业代码
          "CtyRgon_Cd":"156",
          "Prov_AtnmsRgon_Cd":"",//省去
          "Urbn_Cd":"",//城市代码
          "CntyAndDstc_Cd":"",//县区代码
          "Dtl_Adr_Cntnt":wkDtl_Adr_Cntnt,//详细地址
          "ZipECD":"",//邮政编码
          "DpBkInNo":this.$store.state.dpBkInNo,//开户机构编号
          "Ovrlsttn_EV_Trck_No":this.$store.state.initData.Ovrlsttn_EV_Trck_No,
          "SYS_SND_SERIAL_NO":this.$store.state.initData.SYS_SND_SERIAL_NO,
          "TrckEndToETCphrtxtVal":"",
          "Digt_Acc_Mbsh_TpCd":""
        }

         this.$http(
          "/LifeSvc/DigtAccWlt/DigtAccCsInfMnt",
          "P5OISC102",
          params,
          true,
          false
        )
          .then(res => {
            _this.initParamBeforCall103(res);
          
          })
          .catch(err => {
            console.log("失败", err);
            Toast(err.Head.SYS_RESP_DESC);
          });
    },
     sendC103(){
        var _this = this;
        let params ={
          "Digt_Acc_Ar_ID":'',
          "Prtn_Chnl_ID": this.$store.state.initData.Prtn_Chnl_ID, //合作方渠道编号
          "Prtn_Mbsh_ID": this.$store.state.initData.Prtn_Mbsh_ID, //合作方会员编号
          "CntprtAcc":this.$store.state.data1010.Data.CntprtAcc,//对方账号
          "BnkCD":this.$store.state.data1010.Data.BnkCD,//联行号
          "IssuBnk_Nm":this.$store.state.data1010.Data.IssuBnk_Nm,//银行名称
          "CrdHldr_Crdt_TpCd":'1010',
          "CrdHldr_Crdt_No":custId,//持卡人证件号
          "CrdHldr_Nm":custName,//持卡人证件姓名
          "MblPh_No":custMobie,
          "Crdt_AvlDt_StDt":custIdstart,
          "Crdt_AvlDt_EdDt":custIdend,
          "IssuCtf_Ahr_Nm":"",
          "Gnd_Cd":custGend,
          "Nat_Cd":"156",
          "Ethnct_Cd":custNation,
          "Ocp_Cd":this.$store.state.jobValueCode,//职业
          "CtyRgon_Cd":"156",
          "Prov_AtnmsRgon_Cd":"",
          "Urbn_Cd":"",
          "CntyAndDstc_Cd":"",
          "Dtl_Adr_Cntnt":custAddress,
          "ZipECD":this.$store.state.initData.ZipECD,
          "DpBkInNo":this.$store.state.dpBkInNo,
          "SMS_Vld_CD":this.verCodeNo,
          "Ovrlsttn_EV_Trck_No":"",
          "SYS_SND_SERIAL_NO":"",
          "UQPS_Eqmt_Modl":"",
          "UQPS_Eqmt_Lng":"",
          "UQPS_Adr":"",
          "UQPSMAC_Adr":"",
          "UQPSSIM_Eqmt_No":"",
          "UQPSGPS_LO":"",
          "UQPSSIM_CrdNo_CD":"",
          "UQPSSIM_Crd_Num":"",
          "ASPD_ID":"",
          "ASPD_Ditm_ID":"",
          "TrckEndToETCphrtxtVal":""
        }

         this.$http(
          "/LifeSvc/DigtAccWlt/DigtAccCsInfMnt",
          "P5OISC102",
          params,
          true,
          false
        )
          .then(res => {
            _this.initParamBeforCall103(res)
          })
          .catch(err => {
            console.log("失败", err);
            Toast(err.Head.SYS_RESP_DESC);
          });
    },
    verificationRun() {
      if (!this.disabled) {
        return;
      }
       this.verificationNum();
       this.sendPhoneMessag();
    },
    verificationNum: function() {
      if (this.timeNum > 0) {
        this.timeNum--;
        setTimeout(this.verificationNum, 1000);
        this.disabled = false; //开始计时 按钮禁止点击
      } else {
        this.disabled = true; //当timeNum为0时 恢复点击 timeNum重归30
        this.timeNum = 60;
      }
    },
    sendPhoneMessag() {
      if (this.$store.state.bankType == "105") {
        // 本行的发短信验证
        let params = {
          "Digt_Acc_Ar_ID": "",
          "Prtn_Chnl_ID": this.$store.state.initData.Prtn_Chnl_ID, //合作方渠道编号
          "Prtn_Mbsh_ID": this.$store.state.initData.Prtn_Mbsh_ID, //合作方会员编号
          "Rltv_Bnk_AccNo": this.$store.state.dataC101.Data.CntprtAcc,
          "MblPh_No": this.$store.state.dataC101.Data.MblPh_No,
          "Digt_Acc_Bsn_Scn_TpCd": "0001"
        };
        this.$http(
          "/LifeSvc/DigtAccWlt/DAWDigtAccSMSVldCDSnd",
          "P5OISC114",
          params,
          true,
          false
        )
          .then(res => {
            Dialog.alert({
              title: "提示",
              message: "短信发送成功"
            });
          })
          .catch(err => {
            console.log("失败", err);
            Toast(err.Head.SYS_RESP_DESC);
          });
      } else {
        // 他行的发短信验证
        let params = {
          Digt_Acc_Ar_ID: "",
          Prtn_Chnl_ID: this.$store.state.initData.Prtn_Chnl_ID, //合作方渠道编号
          Prtn_Mbsh_ID: this.$store.state.initData.Prtn_Mbsh_ID, //合作方会员编号
          BnkCD: this.$store.state.data1010.Data.BnkCD, //联行号
          IssuBnk_Nm: this.$store.state.data1010.Data.IssuBnk_Nm, //银行名称
          Crdt_TpCd: "1010", //证件类型代码
          Crdt_No:"", //证件号码
          Idv_Lgl_Nm: "",
          MblPh_No:this.$store.state.dataC101.Data.MblPh_No,
          DbCrd_CardNo: this.$store.state.data1010.Data.DbCrd_CardNo,
          DpBkinNo: this.$store.state.dpBkInNo
        };
        this.$http(
          "/LifeSvc/DigtAccWlt/DAWPyAgrmSMSSignTrgr",
          "P5OISC115",
          params,
          true,
          false
        )
          .then(res => {
            Dialog.alert({
              title: "提示",
              message: "短信发送成功"
            });
          })
          .catch(err => {
            console.log("短信发送失败", err);
            Toast(err.Head.SYS_RESP_DESC);
          });
      }
    },
    configFn(){



    },
    nvl(str,replace_str){
         var _this = this;
        if(_this.$ccbskObj.isnull(str)){
          return replace_str;
        }else{
          return str;
        }
    },
    getGenderCodeByValue(value){
        if(value=="男"){
          return "01";
        }else{
          return "02";
        }
    }
  }
};
</script>

<style scoped>
.vercode {
  height: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin: 0 0.15rem;
  border-bottom: 0.01rem solid #f3f4f5;
}
.vercode_left {
  height: 0.5rem;
  font-size: 0.14rem;
  width: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.vercode_left span {
  flex: 1;
  text-align: center;
}
.vercode_left input {
  width: 0.75rem;
  font-size: 0.12rem;
}
.vercode_right {
  height: 0.2rem;
  font-size: 0.12rem;
  line-height: 0.2rem;
  border: 0.01rem solid #09b6f2;
  padding: 0 0.12rem;
  border-radius: 0.1rem;
  color: #09b6f2;
}
.config {
  width: 1.8rem;
  height: 0.3rem;
  border: 0.01rem solid #09b6f2;
  font-size: 0.16rem;
  text-align: center;
  color: #09b6f2;
  line-height: 0.3rem;
  border-radius: 0.15rem;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0.3rem;
  margin: auto;
}
</style>