import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )

const store = new Vuex.Store({
    state: {
        isLoading: false,//loading图状态
        loadText:"",//封装的loading图展示的文字
        initData:"",//获取的初始化数据
        rqs_Jrnl_No:"",//生成的第三方流水
        dataC100:{},//c100接口中返回的数据
        data1010:{},//1010接口返回数据
        dataC101:{},//c101接口返回数据
        dataC104:{},//c104接口返回数据
        dataFace:{},//人脸识别返回数据
        dataFillBasicInfo:{},//填写基础信息
        Avl_Bal:"",//首页中的金额
        openAnAccount:false,
        modFornmData:{},//修改手机号-短信校验数据
        deleteFlag:false,//删除银行卡开关，控制只有一个列能滑动
        addressesData:{},//未开户时调用地址接口返回的数据
        bankType:'',//开户判断本行105 他行非105
        dpBkInNo:''//
    },
    mutations: {
        showLoading(state,isLoad) {
            state.isLoading = isLoad
        },
        loadTextChange(state,text){
            state.loadText = text
        },
        initDataSave(state,init){
            state.initData = init
        },
        rqs_Jrnl_No_Change(state,val){
            state.rqs_Jrnl_No=val
        },
        DataC100_Change(state,val){
            state.dataC100=val
        },
        DataC100_Digt_Acc_Ar_ID_Change(state,val){
            state.dataC100.Data.Digt_Acc_Ar_ID = val
        },
        Data1010_Change(state,val){
            state.data1010=val
        },
        DataC101_Change(state,val){
            state.dataC101=val
        },
        DataC104_Change(state,val){
            state.dataC101=val
        },
        DataFillBasicInfo_Change(state,val){
            state.dataC101=val
        },
        Avl_Bal_Change(state,val){
            state.Avl_Bal=val
        },
        openAnAccount_Change(state,val){
            state.openAnAccount=val
        },
        modFornmData_Change(state,val){
            state.modFornmData=val
        },
        deleteFlag_Change(state,val){
            state.deleteFlag=val
        },
        addressesData_Change(state,val){
            state.addressesData=val
        },
        bankType_change(state,val){
            state.bankType =val
        },
        dpBkInNo_change(state,val){
            state.dpBkInNo = val;
        }
    },
    actions: {}
  
})


export default store
