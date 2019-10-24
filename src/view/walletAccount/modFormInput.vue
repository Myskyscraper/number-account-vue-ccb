<template>
    <div>
        <van-nav-bar title="修改手机号" left-arrow @click-left="back" />
        <van-cell-group>
            <van-field v-model="cardholder"  label="持卡人" disabled/>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="bankCardNo"  label="银行卡" placeholder="请输入银行卡号"/>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="certificateType"  label="证件类型" disabled/>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="idCardNo"  label="证件号" placeholder="请输入证件号"/>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="phoneNo"  label="手机号码" placeholder="请输入新的手机号" maxlength="11"/>
        </van-cell-group>
        <p>
            更换手机号后，下次安全校验信息将发送至您新的手机号码
        </p>
        <!-- <div class="nextbtn" @click="nextBtnFN">
            下一步
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
            :disabled="!cardholder||!bankCardNo||!idCardNo||!phoneNo"
            @click="nextBtnFN"
            >下一步</van-button>
    </div>
</template>
<script>
import { Dialog ,Toast} from 'vant'
export default {
    data() {
        return {
            cardholder:"",//持卡人
            bankCardNo:"",//银行卡号
            certificateType:"身份证",//证件类型
            idCardNo:"",//证件号
            phoneNo:"",//手机号码

        };
    },
    created() {
            // console.log(addrData);
            // this.columns=addrData
            // console.log(this.$store.state.dataC100.Data.CrdHldr_Nm)
            this.cardholder=this.$store.state.dataC100.Data.CrdHldr_Nm
            console.log("状态管理中的额数据",this.$store.state.modFornmData)
            if (JSON.stringify(this.$store.state.modFornmData)!="{}") {
                this.bankCardNo=this.$store.state.modFornmData.SbdrLdg_No
                this.idCardNo=this.$store.state.modFornmData.CrdHldr_Crdt_No
                this.phoneNo=this.$store.state.modFornmData.MblPh_No
            }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        nextBtnFN(){
            // if (!this.cardholder||!this.bankCardNo||!this.idCardNo||!this.phoneNo) {
            //     Toast("请将必填信息补充完整")
            //     return
            // }
            this.$store.commit("modFornmData_Change",{
                'MblPh_No' : this.phoneNo,
                'CrdHldr_Crdt_No' : this.idCardNo,
                'CrdHldr_Nm' : this.cardholder,//
                'DbCrd_CardNo' : this.$store.state.dataC100.Data.DbCrd_CardNo,
                "SbdrLdg_No":this.bankCardNo,
                'CrdHldr_Crdt_TpCd' : "1010",
                'Prtn_Chnl_ID' : this.$store.state.initData.Prtn_Chnl_ID,//respFromApp.Prtn_Chnl_ID
                'Prtn_Mbsh_ID' :  this.$store.state.initData.Prtn_Mbsh_ID,//
                'Digt_Acc_Ar_ID' : this.$store.state.initData.Digt_Acc_Ar_ID  //
            })
            this.$router.push("/verifyCode")
            // modFornmData
            // var params={
            //     'MblPh_No' : this.phoneNo,
            //     'CrdHldr_Crdt_No' : this.idCardNo,
            //     'CrdHldr_Nm' : this.cardholder,//
            //     'DbCrd_CardNo' : this.$store.state.dataC100.Data.DbCrd_CardNo,
            //     "SbdrLdg_No":this.bankCardNo,
            //     'CrdHldr_Crdt_TpCd' : "1010",
            //     'Prtn_Chnl_ID' : this.$store.state.initData.Prtn_Chnl_ID,//respFromApp.Prtn_Chnl_ID
            //     'Prtn_Mbsh_ID' :  this.$store.state.initData.Prtn_Mbsh_ID,//
            //     'Digt_Acc_Ar_ID' : this.$store.state.initData.Digt_Acc_Ar_ID  //
            // }
            // console.log("P5OISC118请求入参",params)
            // this.$http("/LifeSvc/DigtAccWlt/DigtAccModMlPNoAhrVld","P5OISC118",params,true,true).then(res=>{
            //     console.log("P5OISC118请求数据成功",res)

            // }).catch(err=>{
            //     console.log("P5OISC118数据请求失败",err)
            // })
        },
        
       
      
       
          
    },
    watch: {}
};
</script>
<style scoped>
    p{
        font-size: .12rem;color: #999;text-align: center;line-height: .36rem;
    }
    .nextbtn{
        width: 2rem;height: .32rem;border: 0.01rem solid #09b6f2;text-align: center;line-height: .32rem;font-size: .16rem;color: #09b6f2;
        margin: 0 auto;margin-top: 1.4rem;border-radius: .2rem; 
    }
</style>
