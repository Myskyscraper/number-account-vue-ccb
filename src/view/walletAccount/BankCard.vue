<template>
    <div>
        <van-nav-bar title="银行卡" left-arrow @click-left="back" />
        <p class="cardhint">
            向左滑动管理非主绑卡
        </p>
        <div v-for="(item,index) in cardList" :key="index" class="bankcardlist">
            <van-swipe-cell :on-close="onClose" :disabled="index==0">
                <div class="cardmain" :class="{'relieve':index==0}">
                    <img :src="item.image" alt="">
                    <div class="carddetail">
                        <span>{{item.DpBkNm}}</span>
                        <span style="font-size:.12rem;">储蓄卡 <span v-show="index==0"> (主绑卡)</span></span>
                        <i>{{item.cardNo}}</i>
                    </div>
                </div>
                <template slot="right" right-width=150>
                    <div class="operation">
                        <p></p>
                        <div class="setmain" @click="setMain(item)">设为主绑</div>
                        <div class="relieve" @click="relieve(item)">解除绑定</div>
                    </div>
                </template>
            </van-swipe-cell>
        </div>
        <div class="add_bank_card" @click="pushAddBank">
            <i></i>
            <span>添加银行账户</span>
        </div>
    </div>
</template>
<script>
// import msgBox from './mod/msgBox'
import { Dialog } from 'vant'
export default {
    created() {
        this.getBankList()
    },
    data() {
        return {
            cardList: [
                // {
                //     image:require('../../assets/images/icon-img/bank_icon_jianshe.png'),
                //     DpBkNm:"大老表啊啊啊",
                //     cardNo:"84346541321321"
                // },
                // {
                //     image:require('../../assets/images/icon-img/bank_icon_jianshe.png'),
                //     DpBkNm:"大老表啊啊啊",
                //     cardNo:"84346541321321"
                // },
                // {
                //     image:require('../../assets/images/icon-img/bank_icon_jianshe.png'),
                //     DpBkNm:"大老表啊啊啊",
                //     cardNo:"84346541321321"
                // }
            ],
            deleteFlag:false,
            bankImgUrl:require('../../assets/images/icon-img/bank_icon_jianshe.png'),
            otherBankImgUrl:require('../../assets/images/icon-img/bank_icon_jianshe.png'),
        }
    },
    components:{
        // msgBox
    },
    methods: {
        back() {
        this.$router.go(-1) //返回上一层
        },
        pushAddBank(){
            this.$router.push("/addBankMsg")
        },
        getBankList(){
            let params={
                "Digt_Acc_Fcn_Cd": "001",//查询全部绑定账户
                "DbCrd_CardNo": this.$store.state.dataC100.Data.DbCrd_CardNo,//      "6227003240000154080"
            }
            this.$http("/LifeSvc/DigtAccWlt/DigtAccBndgREPrtflSvc","P5OISC105",params,true,true)
            .then(res=>{
                console.log("查询银行卡列表成功",res.Data.FC_ACC_REL_GROUP)
                let bankList=JSON.parse(JSON.stringify(res.Data.FC_ACC_REL_GROUP))
                bankList.forEach((item,index) => {
                    // var bankMsg={}
                    // bankMsg.cardName=item.DpBkNm
                    var endBankNo=item.SbdrLdg_No.slice(item.SbdrLdg_No.length-4,item.SbdrLdg_No.length)
                    var startBankNo=item.SbdrLdg_No.slice(0,4)
                    // bankMsg.cardNo=startBankNo+"****"+endBankNo
                    // bankMsg.image=item.Acct_Dtl_Type=="DC00002"?this.bankImgUrl:this.otherBankImgUrl
                    // bankMsg.id=index+1
                    item.cardNo=startBankNo+"****"+endBankNo
                    item.image=item.Acct_Dtl_Type=="DC00002"?this.bankImgUrl:this.otherBankImgUrl

                    this.cardList.push(item)
                });
                console.log("银行卡列表",this.cardList)
            }).catch(err=>{
                console.log("查询银行卡列表失败",err)
            })
        },
        setMain(val){
            console.log("点击设置主要卡",val)
            Dialog.confirm({
                title: '提示',
                message: '是否将 '+val.cardNo+"设为主绑"
            }).then(() => {
                // on confirm
                console.log("点击确定")
            }).catch(() => {
                console.log("点击取消")
                // on cancel
            })
        },
        relieve(val){
            console.log("点击解除绑定",val)
            Dialog.confirm({
                title: '提示',
                message: '是否将 '+val.cardNo+"解除绑定"
            }).then(() => {
                // on confirm
                console.log("点击确定")
            }).catch(() => {
                console.log("点击取消")
                // on cancel
            })
        },
        onClose(clickPosition, instance) {
             switch (clickPosition) {
                case 'outside':
                instance.close();
                break;
             }
        }
    }
}
</script>
<style scoped>
    .bankCard {
        position: relative;
        box-sizing: border-box;
        /* padding: 8px 16px; */
        color: #323233;
        background-color: #fafafa;
        position: relative;
        display: flex;
        -webkit-box-flex: 1;
        flex: 1;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        min-width: 0;
        min-height: 90px;
        margin: 8px;
    }
    .cardhint{
        font-size: .12rem;color: #999;padding: 0 .1rem;line-height: .3rem;
    }
    .add_bank_card{
        height: .4rem;font-size: .14rem;line-height: .4rem;background: #f4f8fb;
        display: flex;justify-content: left;
    }
    .add_bank_card i{
        display: block;width: .4rem;height: .4rem;position: relative;
        margin-left: .05rem;
    }
    .add_bank_card i::after{
        content:"";width: .03rem;height: .2rem;background: #999;display: block;
        position:absolute;top: 0;bottom: 0;right: 0;left: 0;margin: auto;
    }
    .add_bank_card i::before{
        content: "";width: .2rem;height: .03rem;background: #999;display: block;
        position:absolute;top: 0;bottom: 0;right: 0;left: 0;margin: auto;
    }
    .add_bank_card span{
        color: #999;
    }
    .cardRow {
        margin: 20px 20px;
    }

    .bankcardlist{
        margin:.1rem;overflow: hidden;border-radius: .1rem;
    }
    .cardmain{
        width: 3.4rem;height: 1rem;background:#409EFF;
        display: flex;justify-content: center;align-items: center;font-size: .14rem;
        color: #fff;position: relative;z-index: 100;
    }
    .cardmain img{
        width: .3rem;height: .3rem;padding: .1rem;margin-left: .1rem;
    }
    .carddetail{
        flex: 1;display: flex;flex-direction: column;justify-content: center;
        height: 1rem;
    }
    .operation{
        display: flex;margin-left: .1rem;width: 1.5rem;
    }
    .operation p{
        width: .06rem;background: #fff;height: 1rem;
    }
    .operation div{
        height: 1rem;flex: 1;font-size: .14rem;line-height: 1rem;color: #fff;
        text-align: center;
    }
    .setmain{
        background: #C0C4CC
    }
    .relieve{
        background: #FB3A3A;
    }

</style>
