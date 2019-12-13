<template>
  <div id="addPerInfo">
    <van-nav-bar title="补充个人身份信息" left-arrow @click-left="back" />
    
    <van-field
      readonly
      clickable
      label="银行"
      :value="custBankType"
      placeholder="请输入银行"
      disabled="bankTypeFlag"
      @click="bankshowPicker = true"
      class="colorStr"
    />

    <van-popup v-model="bankshowPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="bankList"
        @cancel="bankshowPicker = false"
        @confirm="bankonConfirm"
      />
    </van-popup>


    <van-cell-group>
      <van-field  placeholder="储蓄卡" label="卡类型" disabled="true" />
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="custName" placeholder="请输入姓名" label="姓名"   />
    </van-cell-group>

    <van-cell-group>
      <van-field  placeholder="身份证" label="证件类型" disabled="true"/>
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="custId" placeholder="请输入证件号码" label="证件号码"/>
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="custMblph" placeholder="请输入手机号" label="手机号" />
    </van-cell-group>

    <van-field
      readonly
      clickable
      label="职业"
      :value="jobvalue"
      placeholder="选择职业"
      @click="jobshowPicker = true"
    />

    <van-popup v-model="jobshowPicker" position="bottom">

      <van-picker
        show-toolbar
        :columns="jobColumns"
        @cancel="jobshowPicker = false"
        @confirm="jobonConfirm"
      />
    </van-popup>

   
    <van-field
      readonly
      clickable
      label="地址"
      :value="adrvalue"
      placeholder="选择地址"
      @click="adrshowPicker = true"
    />

    <van-popup v-model="adrshowPicker" position="bottom">

      
      <van-picker
        show-toolbar
        :columns="adrColumns"
        @cancel="adrshowPicker = false"
        @change="adronChange"
        @confirm="adronConfirm"
      />
    </van-popup>

    <div style="height:20px;"> </div>

   

      <div class="checkbox-wrap">
          <van-checkbox v-model="residChecked" style="float:left;"></van-checkbox> 
          <span>&nbsp;&nbsp;本人声明仅为税收居民，同意</span>
          <router-link to="./etcContract" class="colorBlue"> 《多点零钱卡用户服务协议》</router-link>
      </div>

        <div style="height:10px;"> </div>

       <div class="checkbox-wrap">
             <van-checkbox v-model="longChecked" style="float:left;"></van-checkbox> 
             <span class="colorBlue" >&nbsp;&nbsp;《多点龙会员服务协议》</span>
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
   
  </div>
</template>

<script>
import cityData4 from '../../utils/city-data.js';
import { Dialog ,Toast} from 'vant'

let cityForm={};
const citys = {
  浙江: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
  福建: ["福州", "厦门", "莆田", "三明", "泉州"]
};

const len = cityData4.length
for(let i=0;i<len;i++){
  let keys = cityData4[i].text;
  cityForm[keys] = cityData4[i].children;
}

// console.log(cityForm);

let obj={};
export default {
  data() {
    return {
      value: "",
      custBankType:'',
      custBankSend:'',
      bankTypeFlag:true,
      custName:'',
      custId:'',
      custMblph:'',//手机号
      custJob:'',
      custAddress:'',//地址
      jobvalue: "",
      jobvalueSend:'',
      adrvalue: "",
      adrvalueSend:"",
      cityValSend:"",
      provinValSend:"",
      longChecked:false,
      residChecked:false,
      jobshowPicker: false,
      adrshowPicker: false,
      bankshowPicker:false,
      jobColumns:[
                    {value:"10000",text:"党的机关，国家机关，群众团体和社会组织，企事业单位负责人"},
                    {
                      value:"20000",text:"专业技术人员"
                    },{
                      value:"30000",text:"办事人员和有关人员"
                    },{
                      value:"40000",text:"社会生产服务和生活服务人员"
                    },{
                      value:"50000",text:"农，林，牧，渔业生产及辅助人员"
                    },{
                      value:"60000",text:"生产制造及有关人员"
                    },{
                      value:"80000",text:"不便分类的其他从业人员"
                    }],
      adrColumns: [
        {
          values: Object.keys(cityForm),
          className: "column1"
        },
        {
          values: cityForm["山东省"],
          className: "column2",
          defaultIndex: 0
        }
      ],
      bankList:[{
          value:'10410000004',
          text:'中国银行'
      },{
          value:'10310000026',
          text:'中国农业银行'
      },{
           value:'102100099996',
           text:'中国工商银行'
      },{
           value:'105100000017',
           text:'中国建设银行'
      },{
          value:'301290000007',
          text:'交通银行'
      },{
          value:'403100000004',
          text:'中国邮政储蓄银行'
      }]
    };
  },
  created () {
  
  },
  mounted () {
      this.initData();
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    jobonConfirm(value) {
      this.jobvalue = value.text;//选择职业
      this.jobvalueSend = value.value;
      this.$store.commit("jobValueCode_change",value.value);
      this.jobshowPicker = false;
    },
    adronChange(picker, values) {
      //  console.log(values)
      //  console.log("picker",picker.getColumnValue(0));
      //  console.log("picker",picker.getColumnValue(1).text);
       picker.setColumnValues(1, cityForm[values[0]]);
     
    },
    adronConfirm(values) { 
    //  console.log(values);
     let val  = values[0]+values[1].text;
     this.adrvalue = val; //选择地址
     this.cityValSend = values[1].value;
     this.provinValSend = this.cityValSend.slice(0,2)+"0000";
     this.adrshowPicker = false;
    },
    getAdrNum(){
      let params = {
        "Prtn_Chnl_ID": this.$store.state.initData.Prtn_Chnl_ID, //合作方渠道编号
        "Mnplt_Tp_Ind":"5",
        "CtyRgon_Cd":"156",
        "Prov_AtnmsRgon_Cd":this.provinValSend,//省
        "Urbn_Cd":this.cityValSend,//市
        "CntyAndDstc_Cd":""
      };
         this.$http(
        "/LifeSvc/DigtAccWlt/DAWDigtAccBlgInstMnt",
        "P5OIS3007",
        params,
        true,
        false
      )
        .then(res => {
          console.log("返回3007参数", res);
          this.$store.commit(
            "dpBkInNo_Change",
            res.Data.DpBkInNo
          );
        })
        .catch(err => {
          console.log("数据请求失败", err);
        });
    },
    bankonConfirm(value){
      this.custBankType = value.text;//选择银行
      this.custBankSend = value.value;
      this.bankshowPicker =false;
    },
    initData(){
      
      console.log("1010银行类别33",this.$store.state.data1010.Data.IssuBnk_Nm);
      this.custBankType = this.$store.state.data1010.Data.IssuBnk_Nm;//自动填充银行卡名称
      let bankType = this.$store.state.bankType;
      if(bankType=='105'){
        
      }else{
          this.custName = this.$store.state.dataC104.Data.Idv_Nm;
          this.custId = this.$store.state.dataC104.Data.IDCard_No;
      }
    },
    submitData(){
     if(this.custName==""){
       Dialog.alert({message: '输入姓名'});
       return ;
     }else if(this.custId==""){
         Dialog.alert({message: '输入身份证号'});
         return ;
     }else if(this.custMblph==""){
        Dialog.alert({message: '输入手机证号'});
        return ;
     }else if(this.jobvalue==""){
        Dialog.alert({message: '输入工作类别'});
        return ;
     }else if(this.adrvalue==""){
        Dialog.alert({message: '输入开户地址'});
        return ;
     }else if(this.residChecked==false){
        Dialog.alert({message: '请勾选协议'});
        return ;
     }else{
       this.getAdrNum();
       let params = {
       "Digt_Acc_Ar_ID":'',
       "Prtn_Chnl_ID": this.$store.state.initData.Prtn_Chnl_ID, //合作方渠道编号
       "Prtn_Mbsh_ID": this.$store.state.initData.Prtn_Mbsh_ID, //合作方会员编号
       "CrdHldr_Crdt_TpCd":'1010',
       "CrdHldr_Crdt_No":this.custId,
       "CrdHldr_Nm":this.custName,
       "MblPh_No":this.custMblph,
       "CntprtAcc":this.$store.state.data1010.Data.DbCrd_CardNo,
       "BnkCD":this.$store.state.data1010.Data.BnkCD
      };
      console.log("发送c101参数", params);
      this.$store.commit("DataFillBasicInfo_Change",params);
      this.$http(
        "/LifeSvc/DigtAccWlt/DAWDigtAccOpnAccPrChk",
        "P5OISC101",
        params,
        true,
        false
      )
        .then(res => {
         console.log("返回c101参数", res);
         let bankType = this.$store.state.bankType;
         let timS = res.Data.Crdt_AvlDt_StDt;
         let timE = res.Data.Crdt_AvlDt_EdDt;
         let cusSex = res.Data.Gnd_Cd;
         let cusAddress = res.Data.Digt_Acc_Ar_ID;
         this.$store.commit(
          "DataC101_Change",
            res
         );
          if(bankType=="105"){
            let passFlag = this.$ccbskObj.isnull(timS)||this.$ccbskObj.isnull(timE)||this.$ccbskObj.isnull(cusSex)||this.$ccbskObj.isnull(cusAddress); 
            if(passFlag){
                this.$router.push({ path:'./addUpLoadIdCard'});
            }else{
                this.$router.push({ path:'./openVerifcode'});
            }

          }else{
              this.$router.push({ path:'./faceRecog'});
          }
        })
        .catch(err => {
          console.log("数据请求失败", err);
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
.checkbox-wrap{
  margin-top: 10px;
  padding: 0 17px;
 
}
.white-space{
  width: 30px;
}
.colorBlue{
  color:#09b6f2;
}

[class*=van-hairline]::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid transparent;
    -webkit-transform: scale(.5);
    transform: scale(.5);
}

.bottomButton {
    bottom: .3rem;
    position: absolute;
    width: 70%;
    margin-left: 15%;
    border: 1px solid #ddd;
    left: 0;
}

.van-field__control:disabled{
  
}
.colorStr{
  color: #323233!important;
}
</style>


