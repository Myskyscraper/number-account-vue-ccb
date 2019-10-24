<template>
    <div>
        <van-nav-bar title="银行卡信息" left-arrow @click-left="back" />
        <van-cell-group>
            <van-field
                v-model="bankCardNum"
                clearable
                label="银行卡账号"
                right-icon="question-o"
                placeholder="请输入卡号"
                @input="inputBlue"
                @blur="getBankName"
                @click-right-icon="clickQuestion('支持通过以下银行借记卡开立零钱账户：中国工商银行、中国建设银行、中国农业银行、中国银行、交通银行、中国邮政储蓄银行')"
            />
            <van-field
                v-model="bankNum"
                label="银行"
                disabled
            />
            <van-field
                v-model="bankType"
                disabled
                label="卡类型"
            />
        </van-cell-group>
        <div class="reservemsg">
            请填写银行预留信息，后续只能添加该持卡人的银行卡
        </div>
        <van-cell-group>
            <van-field
                v-model="identityname"
                clearable
                label="姓名"
                placeholder="请输入姓名"
                disabled
            />
            <van-field
                v-model="papersType"
                label="证件类型"
                disabled
            />
            <van-field
                v-model="idCardNum"
                clearable
                label="证件号"
                placeholder="请输入证件号"
            />
        </van-cell-group>
        <div class="reservemsg"></div>
        <van-cell-group>
            <van-field
                v-model="phoneNum"
                clearable
                label="手机号"
                right-icon="question-o"
                placeholder="请输入手机号"
                @click-right-icon="clickQuestion('手机号请填写银行账户发卡行预留手机号')"
            />
        </van-cell-group>
        <!-- <div class="button" @click="configOpenNext">
            确定
        </div> -->
        <van-button
            type="primary"
            size="normal"
            plain
            round
            margin="10px"
            color="#09b6f2"
            class="bottomButton"
            :hairline="true"
            :disabled="!bankCardNum||!idCardNum||!phoneNum"
            @click="configOpenNext"
            >确定</van-button>
    </div>
</template>
<script>
// import msgBox from './mod/msgBox'
import { Dialog ,Toast} from 'vant'
export default {
    created() {},
    data() {
        return {
            bankCardNum:"",
            bankNum:"",
            bankType:"",
            identityname:"",
            papersType:"身份证",
            idCardNum:"",
            phoneNum:"",
            BnkCD:"",
        }
    },
    components:{
        
    },
    created(){
        this.identityname=this.$store.state.dataC100.Data.CrdHldr_Nm
        // this.getBankName()
    },
    methods: {
        back() {
            this.$router.go(-1) //返回上一层
        },
        clickQuestion(val){
            Dialog.alert({
                title: '注意',
                message: val
            }).then(() => {
            // on close
            });        
        },
        getBankName(){
            this.$http("/LifeSvc/DigtAccWlt/DAWDigtAccCardNbgInfEnqr","P5OIS1010",{"DbCrd_CardNo":this.bankCardNum},false,false).then(res=>{
                console.log("查询银行卡列表成功",res)
                this.bankType="储蓄卡"
                this.bankNum=res.Data.IssuBnk_Nm
                this.BnkCD=res.Data.BnkCD
            }).catch(err=>{
                console.log("查询银行卡列表失败",err)
                Toast(err.Head.SYS_RESP_DESC)
            })
        },
        inputBlue(){
            if (this.bankCardNum.length==15&&!this.bankType) {
                this.getBankName()
            }
        },
        configOpenNext(){
            // if (!this.bankCardNum||!this.idCardNum||!this.phoneNum) {
            //     Toast("请将列表补充完完整")
            //     return
            // }
            let params={
                // "DbCrd_CardNo": this.$store.state.dataC100.Data.DbCrd_CardNo , //借记卡卡号   data.Data.DbCrd_CardNo"4213490010017000"
                
                "Digt_Acc_Ar_ID":this.$store.state.initData.Digt_Acc_Ar_ID,  //数字账户合约编号 //Digt_Acc_Ar_ID"33900010000000000000001"
                "Prtn_Chnl_ID": this.$store.state.initData.Prtn_Chnl_ID,  //合作方渠道编号
                "Prtn_Mbsh_ID": this.$store.state.initData.Prtn_Mbsh_ID,//合作方会员编号
                "CrdHldr_Crdt_TpCd":"1010",
                "CrdHldr_Crdt_No":this.idCardNum,
                "CrdHldr_Nm":this.$store.state.dataC100.Data.CrdHldr_Nm,
                "MblPh_No":this.phoneNum,
                "CntprtAcc":this.bankCardNum,
                "BnkCD":this.BnkCD,
            }
            console.log("添加银行卡请求入参",params)
            this.$http("/LifeSvc/DigtAccWlt/DAWDigtAccOpnAccPrChk","P5OISC101",params,true,false).then(res=>{
                console.log("添加银行卡请求成功",res)

            }).catch(err=>{
                console.log("添加银行卡请求失败",err)
                Toast(err.Head.SYS_RESP_DESC)
            })
        }
    }
}
</script>
<style scoped>
    .reservemsg{
        font-size: .12rem;line-height: .3rem;background: #f3f4f5;color: #999;text-align: center;
    }
    .button{
        font-size: .16rem;line-height: .4rem;width: 2.6rem;height: .4rem;border: .01rem solid #999;color: #999;
        text-align: center;margin: .12rem auto;border-radius: .2rem;
    }
</style>
