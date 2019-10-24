<template>
    <div>
        <van-nav-bar title="手机验证码" left-arrow @click-left="back" />
        <div class="vercode">
            <div class="vercode_left">
                <span>验证码</span>
                <input type="text" maxlength="6" placeholder="请输入验证码" v-model="verCodeNo">
            </div>
            <div class="vercode_right" @click="verificationRun">
                {{verCodeText}}
            </div>
        </div>
        <!-- <div class="config" @click="configFn">确定</div> -->
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
    export default {
        data() {
            return {
                // verCodeText:"",
                timeNum:60,
                disabled:true,  //控制提交按钮能否点击 false为可以点击 true为禁止状态
                verCodeNo:"",
            };
        },
        mounted(){
            this.verificationRun()
        },
        methods: {
            back() {
            this.$router.go(-1);
            },
            verificationRun:function(){
				if (!this.disabled) {
					return;
                }
                this.verificationNum()
                let params=JSON.stringify(this.$store.state.modFornmData)=="{}"?{
                    "Digt_Acc_Ar_ID" : this.$store.state.dataC100.Data.Digt_Acc_Ar_ID,//
                    "Prtn_Chnl_ID": this.$store.state.dataC100.Data.Prtn_Chnl_ID,//
                    "Prtn_Mbsh_ID" : this.$store.state.dataC100.Data.Prtn_Mbsh_ID,//
                    "DbCrd_CardNo":this.$store.state.dataC100.Data.DbCrd_CardNo,//借记卡卡号
                    "Dep_TxnAmt": this.$route.query.Dep_TxnAmt,//充值金额
                    "Digt_Acc_Bsn_Scn_TpCd":this.$route.query.isWithdrawDeposit?"0004":"0003", //数字账户业务场景代码
                    "Rltv_Bnk_AccNo": this.$route.query.SbdrLdg_No // 关联银行账号
                }:this.$store.state.modFornmData;
                let requestUrl=JSON.stringify(this.$store.state.modFornmData)=="{}"?"/LifeSvc/DigtAccWlt/DAWDigtAccSMSVldCDSnd":"/LifeSvc/DigtAccWlt/DigtAccModMlPNoAhrVld";
                let requestCode=JSON.stringify(this.$store.state.modFornmData)=="{}"?"P5OISC114":"P5OISC118";
                console.log("获取短信验证码入参",params,requestUrl,requestCode)
                this.$http(requestUrl,requestCode,params,true,false).then(res=>{
                    // this.moneyNum=Avl_Bal
                    console.log("短信获取成功",res)
                }).catch(err=>{
                    console.log("短信获取失败",err)
                    Toast(err.Head.SYS_RESP_DESC)
                })
            },
            verificationNum:function(){
				if (this.timeNum>0) {
					this.timeNum--;
					setTimeout(this.verificationNum, 1000);
					this.disabled=false;//开始计时 按钮禁止点击
				} else {
					this.disabled=true; //当timeNum为0时 恢复点击 timeNum重归30
					this.timeNum=60;
				}
            },
            configFn(){//点击确定
                if (JSON.stringify(this.$store.state.modFornmData)=="{}") {  
                    if (!this.$route.query.isWithdrawDeposit) {
                        // 充值
                        let params={
                            "OurBnk_OBnk_Ind":this.$route.query.Acct_Dtl_Type=="DC00002"?"1":"0",//本行他行标志，1-本行；0-他行
                            "DbCrdTfrOutCrd_CardNo" : this.$route.query.SbdrLdg_No,//借记卡转出卡号DbCrdTfrOutCrd_CardNo "6217003240010750761"
                            "DbCrd_CardNo" : this.$store.state.dataC100.Data.DbCrd_CardNo,//借记卡卡号data.Data.DbCrd_CardNo "6227003240000154080"
                            "TXN_INSID" :  this.$store.state.dataC100.Data.DpBkInNo,//交易机构编号
                            "CcyCd" : "156",//币种代码
                            "CshEx_Cd" : "1",//钞汇代码
                            "DbCrd_TxnAmt" : this.$route.query.Dep_TxnAmt,//借记卡交易金额
                            "Smy_Cd" : "0194",//摘要代码
                            "Txn_Rmrk" : "数字钱包充值",//交易备注
                            "SMS_Vld_CD" : this.verCodeNo  //短信验证码
                        }
                        this.$http("/LifeSvc/DigtAccWlt/DAWDigtAccRchrq","P5OISC201",params,true,false)
                        .then(res=>{
                            console.log("充值成功",res)
                            Dialog.alert({
                                title: '提示',
                                message: '充值成功'
                            }).then(() => {
                            // on close
                                localStorage.removeItem("selData")
                                this.$router.push("/walletMenu")
                            });
                        }).catch(err=>{
                            console.log("充值失败",err)
                            Toast(err.Head.SYS_RESP_DESC)
                        })
                    }else{
                        //提现
                        let params={
                            "Digt_Acc_Ar_ID": this.$store.state.dataC100.Data.Digt_Acc_Ar_ID,//数字账户合约编号
                            // "Digt_Acc_Ar_ID":"33900010000000000000002",//数字账户合约编号
                            "Prtn_Chnl_ID": "",//合作方渠道编号
                            "Prtn_Mbsh_ID": "",//合作方会员编号
                            "DbCrd_CardNo":  this.$store.state.dataC100.Data.DbCrd_CardNo,//借记卡卡号
                            "TXN_INSID" :  this.$store.state.dataC100.Data.DpBkInNo,//交易机构编号
                            // "DbCrd_CardNo": "6227003240000154080",//借记卡卡号
                            "CcyCd": "156", //币种代码
                            "CshEx_Cd": "1", //钞汇代码
                            "Dep_TxnAmt":this.$route.query.Dep_TxnAmt , //存款交易金额
                            "OurBnk_OBnk_Ind": this.$route.query.Acct_Dtl_Type=="DC00002"?"1":"0",//本地他行标志
                            "Sign_Agrm_ID": "",//签约协议编号
                            "RcvPymtPs_AccNo": this.$route.query.SbdrLdg_No,//收款人账号
                            // "RcvPymtPs_Nm": selData.CrdHldr_Nm, //收款人名称
                            "RcvPymtPs_Nm": this.$store.state.dataC100.Data.CrdHldr_Nm, //收款人名称
                            "RPPDBnk_Nm":JSON.parse(localStorage.getItem('selData')).DpBkNm,
                            // "RcvPymtPs_Nm": "测试", //收款人名称
                            "RPPDBnk_BrNo": JSON.parse(localStorage.getItem('selData')).BnkCD, //收款人开户行行号    联行号
                            "Ctfn_TpCd": "008", //认证类型代码
                            "MblPh_No":  "", //手机号码
                            "SMS_Vld_CD": this.verCodeNo, //短信验证码
                            "DbCrd_MsgRp_Ecrp_Pswd": "",//借记卡报文加密密码
                            "Smy_Cd": "",//摘要代码
                            "Txn_Rmrk": "数字钱包提现"
                        }
                        console.log('提现入参',params)
                        this.$http("/LifeSvc/DigtAccWlt/DAWDigtAccRtrv","P5OISC202",params,true,true)
                        .then(res=>{
                            console.log("提现成功",res)
                            Dialog.alert({
                                title: '提示',
                                message: '提现成功'
                            }).then(() => {
                            // on close
                                this.$router.push("/walletMenu")
                            });
                        }).catch(err=>{
                            console.log("提现失败",err)
                            Toast(err.Head.SYS_RESP_DESC)
                        })
    
                    }
                }else{
                    let params=Object.assign({
                        "SMS_Vld_CD": this.verCodeNo,
                        "Ctfn_TpCd": "008",
                        "Digt_Acc_Bsn_Scn_TpCd":"0010"
                    },this.$store.state.modFornmData)
                    console.log("手机修改接口请求入参",params)
                    // console.log("状态管理中的数据",this.$store.state.modFornmData)
                    this.$http("/LifeSvc/DigtAccWlt/DigtAccWltModMblPhNo","P5OISC119",params,true,false).then(res=>{
                        console.log("手机号修改成功",res)
                        Dialog.alert({
                            title: '提示',
                            message: '手机号修改成功'
                        }).then(() => {
                        // on close
                            this.$router.push("/walletMenu")
                        });
                    }).catch(err=>{
                        console.log("手机号修改失败",err)
                        Toast(err.Head.SYS_RESP_DESC)
                    })
                }
            }
        },
        watch: {},
        computed:{
			//处理倒计时
			verCodeText:function(){
                return this.timeNum >59? '重新发送':'('+this.timeNum+')s后重新发送';
            }
        },
        
    };
</script>
<style scoped>
    .vercode{
        height: .5rem;
        display: flex;justify-content: space-between;
        align-items: center;box-sizing: border-box;margin: 0 .15rem;
        border-bottom: .01rem solid #f3f4f5;
    }
    .vercode_left{
        height: .5rem;font-size: .14rem;width: 1.6rem;
        display: flex;justify-content: space-between;align-items: center;
    }
    .vercode_left span{
        flex: 1;text-align: center;
    }
    .vercode_left input{
        width: .75rem;font-size: .12rem
    }
    .vercode_right{
        height: .2rem;font-size: .12rem;
        line-height: .2rem;border: .01rem solid #09b6f2;
        padding: 0 .12rem;border-radius: .1rem;color: #09b6f2;
    }
    .config{
        width: 1.8rem;height: .3rem;border: .01rem solid #09b6f2;
        font-size: .16rem;text-align: center;color: #09b6f2;line-height: .3rem;
        border-radius: .15rem;position: fixed;right: 0;left: 0;bottom: .3rem;margin: auto;
    }
</style>
