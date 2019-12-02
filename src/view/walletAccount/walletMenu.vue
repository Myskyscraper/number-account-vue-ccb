<template>
    <div id="textmodel">
        <van-sticky>
            <van-nav-bar title="零钱卡" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
                <van-icon name="location-o" slot="right" size=".14rem" v-show="!$store.state.openAnAccount"/>
                <span slot="right" style="color:#fff;font-size:.14rem;padding:0 .05rem" v-show="!$store.state.openAnAccount">{{cityname?cityname:"请选择"|disCityName}}</span>
                <van-icon name="arrow-down" slot="right" size=".14rem" v-show="!$store.state.openAnAccount"/>
                <!-- <div style="font-size:.12rem;color:#000;" slot="right"></div> -->
            </van-nav-bar>
        </van-sticky>
        <div class="walle_detail">
            <div class="min_cont" v-show='$store.state.openAnAccount'>
                <span>零钱卡余额(元)</span>
                <i>{{moneyNum}}</i>
            </div>
            <div class="openWallet" v-show="!$store.state.openAnAccount"  @click="test">
                开通钱包
            </div>
        </div>
        <van-grid :column-num="3">
            <!-- :to="{path:item.path,query:{moneyNum:moneyNum?moneyNum:''}}" -->
            <div v-for="(item) in icons"  :key="item.id" :class="routClass" @click="goNextPage(item)">
                <van-grid-item :text="item.text" :icon="item.icon" />
            </div>
        </van-grid>

       
        <div style="margin-top:10px;font-size:12px;" @click="test1">
           测试：调到开户
        </div>

         <div style="margin-top:10px;font-size:12px;"  @click="test2">
            测试：调到短信验证码
        </div>

        <div class="hintbox">
            本服务由建设银行提供
        </div>
    </div>
</template>
<script>
// import CityModel from "./CityModel";
import { Dialog } from 'vant'
export default {
    name:"walleAccount",
    data(){
        return {
            icons: [
                {
                    id: 2,
                    icon: require('../../assets/images/icon-img/cz.png'),
                    text: '充值',
                    path: '/recharge'
                },
                {
                    id: 3,
                    icon: require('../../assets/images/icon-img/tx.png'),
                    text: '提现',
                    path: '/withdrawDeposit'
                },
                {
                    id: 1,
                    icon: require('../../assets/images/icon-img/qb.png'),
                    text: '零钱卡明细',
                    path: '/detail'
                },
                {
                    id: 4,
                    icon: require('../../assets/images/icon-img/yh.png'),
                    text: '绑卡管理',
                    path: '/bankCard'
                },
                {
                    id:5,
                    icon:require('../../assets/images/icon-img/aq.png'),
                    text:"安全管理",
                    path:"/Security"
                },
                {
                    id:6,
                    icon:require('../../assets/images/icon-img/aq.png'),
                    text:"支付管理",
                    path:"/payManage"
                }
            ],
            routClass: 'router-link-style',
            moneyNum:"0.00",
            cityname:"",
            // initData:null,
        }
    },
    components:{
        
    },
    props:[],
    created(){
        this.cityname=this.$route.query.city_name?this.$route.query.city_name:this.$store.state.addressesData.ADiv_Nm
        this.$store.commit("modFornmData_Change",{})
        // console.log("创建后")
        // this.$store.state.initData=JSON.parse(this.$store.state.initData)
        if (this.$store.state.openAnAccount) {
            this.getMoneyMsg()
        }
    },
    mounted(){
        // setTimeout(() => {
        //     this.$closeLoading()
        // }, 3000);
        // alert("进入第二个页面")
        // console.log(window.location.href)
        
    },
    watch:{},
    beforeUpdate(){
        // console.log("组件更新前")
    },
    updated(){
        // console.log("组件更新后")
    },
    beforeDestory(){
        // console.log("组件销毁前") 
    },
    destoryed(){
        // console.log("组件销毁后")
    },
    filters:{
       disCityName(val){
           return val.length>4?val.slice(0,4)+"...":val
       } 
    },
    methods:{
        onClickLeft() {
            // alert('返回')
            this.$router.push("/walletMain")
        },
        test1(){
            console.log('ok')
            this.$router.push("/addBankCard")
        },
        test2(){
            console.log('ok')
            this.$router.push("/openVerifcode")
        },
        getMoneyMsg(){
            let params={
                "DbCrd_CardNo": this.$store.state.dataC100.Data.DbCrd_CardNo , //借记卡卡号   data.Data.DbCrd_CardNo"4213490010017000"
                "Digt_Acc_Ar_ID":this.$store.state.initData.Digt_Acc_Ar_ID,  //数字账户合约编号 //Digt_Acc_Ar_ID"33900010000000000000001"
                "Prtn_Chnl_ID": this.$store.state.initData.Prtn_Chnl_ID,  //合作方渠道编号
                "Prtn_Mbsh_ID": this.$store.state.initData.Prtn_Mbsh_ID,//合作方会员编号
                "CcyCd": "156",  //币种代码
                "CshEx_Cd": "1"   //钞汇代码
            }
            console.log("查询零钱账户金额入参",params)
            this.$http("/LifeSvc/DigtAccWlt/DAWDigtAccAcBaEnqr","P5OISC107",params,true,true)
            .then(res=>{
                console.log("查询账户余额成功",res)
                this.$store.commit("Avl_Bal_Change",res.Data.Avl_Bal)
                this.moneyNum=res.Data.Avl_Bal
            }).catch(err=>{
                console.log("数据请求失败",err)
            })
        },
        goNextPage(val){
            // path:item.path,query:{moneyNum:moneyNum?moneyNum:''}
            if (!this.$store.state.openAnAccount) {
                Dialog.confirm({
                    title: '提示',
                    message: '<div style="text-align:left">尊敬的客户</div><div style="text-align:left;text-indent: 2em">您尚未开通零钱账户，点击确定将跳转开通零钱账户</div>'
                }).then(() => {
                    // on confirm
                    console.log("点击确定")
                }).catch(() => {
                    console.log("点击取消")
                    // on cancel
                })
                return
            }
            this.$router.push({
                path:val.path,
                query:{
                    moneyNum:this.moneyNum?this.moneyNum:''
                }
            })
        },
        onClickRight(){
            console.log("打开右侧地址选择栏")
            this.$router.push({
                path:"/indexBar",
                query:{
                    city_name:this.cityname
                }
            })
        },
        
        
    }
    
}
</script>
<style scoped>
    .van-col--8 {
        height: 125px;
        background-color: #09b6f2;
        text-align: center;
        line-height: 125px;
        color: #fff;
    }
    .router-link-style {
        flex-basis: 33.3333%;
    }
    .walle_detail{
        height: 1.25rem;background: #09b6f2;
        display: flex;color:#fff;align-items: center;justify-content: center;
    }
    .walle_detail .openWallet{
        color: #09b6f2;line-height: .4rem;border-radius: .2rem;background: #fff;font-size: .16rem;padding: 0 .5rem;
    }
    .min_cont{
        flex: 1;display: flex;flex-direction: column;align-items: center;
    }
    .min_cont i{
        font-size: .2rem;line-height: .3rem;
    }
    .min_cont span{
        font-size: .12rem;line-height: .3rem;
    }
    .hintbox{
        font-size: .12rem;color: #999;text-align: center;position: fixed;left: 0;right: 0;bottom: 1rem;margin: auto;
    }
</style>


