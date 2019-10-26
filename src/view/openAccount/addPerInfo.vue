<template>
  <div id="addPerInfo">
    <van-nav-bar title="补充个人身份信息" left-arrow @click-left="back" />

    <van-cell-group>
      <van-field v-model="value" placeholder="请输入用户名" label="银行" />
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="value" placeholder="储蓄卡" label="卡类型" disabled="true" />
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="value" placeholder="请输入姓名" label="姓名" />
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="value" placeholder="身份证" label="证件类型" />
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="value" placeholder="请输入证件号码" label="证件号码" />
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="value" placeholder="请输入手机号" label="手机号" />
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

    <van-checkbox v-model="checked">复选框</van-checkbox>

   
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
      jobvalue:'',
      adrvalue:'',
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
      checked:''
    };
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
      this.adrvalue = String(value);
      this.adrshowPicker = false;
    }
  }
};
</script>

<style scoped>
*{
  font-size: 14px;
}
</style>