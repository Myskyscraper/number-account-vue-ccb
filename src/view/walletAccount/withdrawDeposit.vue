<template>
<div>
    <van-nav-bar title="提现" left-arrow @click-left="back" />
    <van-cell :title="bankName" is-link @click="chooseBankCard" :value="bankDetailBar" />
    <van-cell :class="inputColor">
    <h4 class="inputTitle">提现金额（元）</h4>
    <van-field v-model="inputValue" class="inputBox" type="number" />
    </van-cell>
    <van-button
        type="primary"
        size="normal"
        plain
        round
        margin="10px"
        color="#09b6f2"
        class="bottomButton"
        :hairline="true"
        :disabled="bankDetailBar==''||inputValue==''||inputValue/1<=0"
        @click="clickNext"
        >下一步</van-button>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
        <van-cell title="请选择充值银行账户" :class="bankCardTitle">
            <van-icon
            slot="right-icon"
            name="cross"
            style="line-height: inherit;"
            @click="closeCardList"
            />
        </van-cell>
        <van-radio-group v-model="radio">
            <van-cell-group v-for="(item,index) in bankListData" :key="index">
                <van-cell
                    :title="item.DpBkNm"
                    clickable
                    @click="radio = ''+(index+1)"
                    :icon="require('../../assets/images/icon-img/bank_icon_jianshe.png')"
                >
                    <van-radio slot="right-icon" :name="''+(index+1)" />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-popup>
</div>
</template>
<script>
export default {
    data() {
        return {
            bankName: '银行账号',
            show: false,
            bankCardTitle: 'bankCardTitleStyle',
            radio: "1",
            inputColor: 'inputColor',
            buttonCrtl: true,
            inputValue: '',
            bankListData:[],
            // selectAccount:{},
            bankDetailBar:"",
            noneDisBankListData:[],
        }
    },
    mounted(){
        this.getBankList()
        console.log(this.$route.query.moneyNum)
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        chooseBankCard() {
            this.show = true
        },
        closeCardList() {
            this.show = false
        },
        clickNext() {//点击下一步
            
            this.$router.push({
                path: '/verifyCode',
                query:{
                    SbdrLdg_No:this.bankListData[this.radio-1].SbdrLdg_No,
                    Dep_TxnAmt:this.inputValue,
                    Acct_Dtl_Type:this.bankListData[this.radio-1].Acct_Dtl_Type,
                    isWithdrawDeposit:1
                }
            })
        },
        getBankList(){
            let params={
                "Digt_Acc_Fcn_Cd": "001",//查询全部绑定账户
                "DbCrd_CardNo": this.$store.state.dataC100.Data.DbCrd_CardNo,//      "6227003240000154080"
            }
            this.$http("/LifeSvc/DigtAccWlt/DigtAccBndgREPrtflSvc","P5OISC105",params,true,true)
            .then(res=>{
                console.log("查询银行卡列表成功",res)
                this.noneDisBankListData=res.Data.FC_ACC_REL_GROUP
                this.bankListData=JSON.parse(JSON.stringify(res.Data.FC_ACC_REL_GROUP))
                this.bankListData.forEach(item => {
                    item.DpBkNm=item.DpBkNm+"("+item.SbdrLdg_No.slice(item.SbdrLdg_No.length-4,item.SbdrLdg_No.length) +")"
                });
                this.bankDetailBar=this.bankListData[this.radio-1].DpBkNm
                localStorage.setItem('selData',JSON.stringify(res.Data.FC_ACC_REL_GROUP[this.radio-1]))
            }).catch(err=>{
                console.log("查询银行卡列表失败",err)
            })
        },
        // selectList(val){
        //     console.log("选择列表",val)
        //     this.selectAccount=val
        //     this.bankDetailBar=val.DpBkNm
        // }
    },
    watch: {
        // inputValue: function(val) {
        //     if (val == null || val === 0) {
        //         this.buttonCrtl = true
        //     } else {
        //         this.buttonCrtl = false
        //     }
        // }
        radio:function(val){
            this.bankDetailBar=this.bankListData[val-1].DpBkNm
            localStorage.setItem('selData',JSON.stringify(this.noneDisBankListData[val-1]))
            
        }
    }
}
</script>
<style scoped>
.bankCardTitleStyle {
    background-color: #09b6f2;
    color: #fff;
    text-align: center;
}
.inputColor {
    height: 180px;
    background-color: #f4f8fb;
}
.inputTitle {
    font-weight: 500;
    color: #333;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    text-align: center;
}
</style>
