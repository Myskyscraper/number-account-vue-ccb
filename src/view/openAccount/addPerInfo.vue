<template>
  <div id="addPerInfo">
    <van-nav-bar title="补充个人身份信息" left-arrow @click-left="back" />

    <!-- <van-cell-group>
      <van-field v-model="custBankType" placeholder="请输入银行" label="银行" />
    </van-cell-group> -->

    
    <van-field
      readonly
      clickable
      label="银行"
      :value="custBankType"
      placeholder="请输入银行"
      disabled="bankTypeFlag"
      @click="bankshowPicker = true"
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
      <van-field v-model="custName" placeholder="请输入姓名" label="姓名" />
    </van-cell-group>

    <van-cell-group>
      <van-field  placeholder="身份证" label="证件类型" disabled="true"/>
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="custId" placeholder="请输入证件号码" label="证件号码" />
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

    <!-- 111111111111111111111 -->

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

      <div class="checkbox-wrap">
          <van-checkbox v-model="checked" style="float:left;"></van-checkbox> 
          <span>本人声明仅为税收居民，同意</span>
          <span class="colorBlue" @click="showPopup" >《多点零钱卡用户服务协议》</span>
          及 <span class="colorBlue" @click="dedectShowPopup">《委托扣款服务协议》</span>
      </div>

       <div class="checkbox-wrap">
             <van-checkbox v-model="longChecked" style="float:left;"></van-checkbox> 
             <span class="colorBlue" @click="longShowPopup">《多点龙会员服务协议》</span>
       </div>

      <!-- 多点零钱协议 -->
     <van-popup v-model="showPopupFlag">
       内容内容内容内容内容内容内容内容内容
     </van-popup>


     <!-- 委托扣款协议 -->
      <van-popup v-model="dedectShowPopupFlag">
       委托扣款协议委托扣款协议委托扣款协议委托扣款协议
     </van-popup>
     
      <!-- 龙会员内容 -->
      <van-popup v-model="longShowPopupFlag">
       龙会员服务内容
     </van-popup>


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

console.log(cityForm);


let obj={};
export default {
  data() {
    return {
      value: "",
      custBankType:'',
      bankTypeFlag:true,
      custName:'',
      custId:'',
      custMblph:'',//手机号
      custJob:'',
      custAddress:'',//地址
      jobvalue: "",
      adrvalue: "",
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
      checked: false,
      showPopupFlag:false,
      longChecked:false,
      longShowPopupFlag:false,
      dedectShowPopupFlag:false,
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
    this.initData()
  },
  methods: {
    test(val1,val2){
      let id=val1;
      
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    jobonConfirm(value) {
      this.jobvalue = value.text;//选择职业
      this.jobshowPicker = false;
    },
    adronChange(picker, values) {
      //  console.log(values)
     
      
       console.log("picker",picker.getColumnValue(0));
       console.log("picker",picker.getColumnValue(1).text);
        

       picker.setColumnValues(1, cityForm[values[0]]);
      // console.log("picker",picker.getColumnValue());
    },
    adronConfirm(values) { 
     console.log(values);
     let val  = values[0]+values[1].text;
     this.adrvalue = val; //选择地址
     this.adrshowPicker = false;
    },
    bankonConfirm(value){
      this.custBankType = value.text;//选择银行
      this.bankshowPicker =false
    },
    showPopup(){
        this.showPopupFlag =true ; 
    },
    longShowPopup(){
        this.longShowPopupFlag = true;
    },
    dedectShowPopup(){
        this.dedectShowPopupFlag = true;
    },
    initData(){
        // for(let i=0;i<cityData4.length;i++){
        //   obj[cityData4[i].text]=cityData4[i].children;
        // }
      this.custBankType = this.$store.state.data1010.IssuBnk_Nm;//自动填充银行卡名称
      let bankType = this.$store.state.bankType;
      if(bankType=='105'){
         
      }else{
          
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
     }else if(this.custJob==""){
        Dialog.alert({message: '输入工作类别'});
        return ;
     }else if(this.custAddress==""){
        Dialog.alert({message: '输入开户地址'});
        return ;
     }else if(this.checked==false){
        Dialog.alert({message: '请勾选协议'});
        return ;
     }else{
        let params = {
       " Digt_Acc_Ar_ID":'',
       " Prtn_Chnl_ID": this.$store.state.initData.Prtn_Chnl_ID, //合作方渠道编号
       " Prtn_Mbsh_ID": this.$store.state.initData.Prtn_Mbsh_ID, //合作方会员编号
       " CrdHldr_Crdt_TpCd":'1010',
       " CrdHldr_Crdt_No":custId,
       "CrdHldr_Crdt_Nm":custName,
       "MblPh_No":custMblph,
        "CntprtAcc":this.$store.state.data1010.Data.CntprtAcc,
       " BnkCD":this.$store.state.data1010.Data.BnkCD
      };
      console.log("发送c101参数", params);
      this.$store.commit("DataFillBasicInfo_Change",params);
      this.$http(
        "/LifeSvc/DigtAccWlt/DAWDigtAccOpnAccPrChk",
        "P5OISC101",
        params,
        true,
        true
      )
        .then(res => {
          console.log("返回c101参数", res);
          this.$store.commit(
            "DataC100_Digt_Acc_Ar_ID_Change",
            res.Data.Digt_Acc_Ar_ID
          );

          this.$router.push({ path:'./addPerInfo'})

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
  padding: 0 10px;
 
}
.white-space{
  width: 30px;
}
.colorBlue{
  color:#09b6f2;
}
</style>


