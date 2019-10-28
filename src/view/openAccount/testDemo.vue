<template>
  <div id="test">
   

   

    <van-picker :columns="columns" @change="onChange" />


  </div>
</template>

<script>
const citys = {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
};
export default {
  data() {
    return {
      value: "",
      custName:'',
      custId:'',
      custMblph:'',//手机号
      custJob:'',
      custAddress:'',//地址
      jobvalue: "",
      adrvalue: "",
      columns: [
        {
          values: Object.keys(citys),
          className: 'column1'
        },
        {
          values: citys['浙江'],
          className: 'column2',
          defaultIndex: 2
        }
      ]
    };
  },
  methods: {
    show() {
      console.log(this.text.length);
    },
    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    }
  }
};
</script>

<style>
* {
  font-size: 18px;
}
</style>