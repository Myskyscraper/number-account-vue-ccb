<template>
  <div id="addPerInfo">
    <van-nav-bar title="补充个人身份信息" left-arrow @click-left="back" />

    <van-cell-group>
      <van-field v-model="custBankType" placeholder="请输入银行" label="银行" />
    </van-cell-group>

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
           <div class="white-space">
          </div><van-checkbox v-model="checked"></van-checkbox> 
          <span class="ml10" @click="showPopup">用卡协议详情</span>
      </div>
     <van-popup v-model="showPopupFlag">
       内容内容内容内容内容内容内容内容内容
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
      @click="nextStep"
    >下一步</van-button>
  </div>
   
  </div>
</template>

<script>
const citys = {
  浙江: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
  福建: ["福州", "厦门", "莆田", "三明", "泉州"]
};

export default {
  data() {
    return {
      value: "",
      custBankType:'',
      custName:'',
      custId:'',
      custMblph:'',//手机号
      custJob:'',
      custAddress:'',//地址
      jobvalue: "",
      adrvalue: "",
      jobshowPicker: false,
      adrshowPicker: false,
      jobColumns: ["工作1", "工作2", "工作3", "工作4", "工作5", "工作6"],
      adrColumns: [
        {
          values: Object.keys(citys),
          className: "column1"
        },
        {
          values: citys["浙江"],
          className: "column2",
          defaultIndex: 2
        }
      ],
      checked: false,
      showPopupFlag:false
    };
  },
  created () {
    this.initData()
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    jobonConfirm(value) {
      this.jobvalue = value;
      this.jobshowPicker = false;
    },
    adronChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },
    adronConfirm(value) { 
      this.adrvalue = String(value); //选择地址
      this.adrshowPicker = false;
    },
    showPopup(){
        this.showPopupFlag =true
    },
    initData(){
      let bankType = this.$store.state.bankType;
      if(bankType=='105'){
          this.custBankType="中国建设银行";

      }else{

      }
    },
    nextStep(){
      console.log('ok');
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
  display: flex;
}
.white-space{
  width: 30px;
}
.ml10{
  padding-left: 10px;
}
</style>


