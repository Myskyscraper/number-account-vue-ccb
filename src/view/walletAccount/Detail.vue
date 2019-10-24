<template>
    <div>
        <van-nav-bar title="钱包明细" left-arrow @click-left="back" />
        <div class="account_detail">
            <div>
                <span>{{$store.state.dataC100.Data.DbCrd_CardNo}}</span>
                <span></span>
                <span></span>
            </div>
            <div>
                <span>账户类别:</span>
                <span>II 类账户</span>
                <span></span>
            </div>
            <div>
                <span>人民币:</span>
                <span>{{$store.state.Avl_Bal}}</span>
                <span>活期储蓄</span>
            </div>
        </div>
        <!-- <van-tabs v-model="active" @click="tabClick" color="#09b6f2" title-active-color="#09b6f2">
            <van-tab title="当天">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset="10" :immediate-check="false">
                    <van-cell v-for="(item,index) in list" :key="index" @click="change(item)">
                        <van-row>
                            <van-col span="6">
                                <van-row class="list-row-col">周六</van-row>
                                <van-row class="list-row-col">{{item.Txn_Dt}}</van-row>
                            </van-col>
                            <van-col span="16" class="list-row-col">
                                <van-row>
                                    <van-col span="10" class="list-row-col">支出</van-col>
                                    <van-col span="14" class="list-row-col">1000</van-col>
                                </van-row>
                                <van-row>
                                    <van-col span="10" class="list-row-col">余额</van-col>
                                    <van-col span="14" class="list-row-col">{{item.Dep_AcBa}}</van-col>
                                </van-row>
                                <van-row>
                                    <van-col span="10" class="list-row-col">摘要</van-col>
                                    <van-col span="14" class="list-row-col">冲正</van-col>
                                </van-row>
                                <van-row>
                                    <van-col span="10" class="list-row-col">交易地点/附言</van-col>
                                    <van-col span="14" class="list-row-col">冲正</van-col>
                                </van-row>
                                <van-row v-show="checkExpended(item)">
                                    <van-col span="10" class="list-row-col">交易时间</van-col>
                                    <van-col span="14" class="list-row-col">{{item.Txn_Lcl_Dt+" "+item.Txn_Lcl_Tm}}</van-col>
                                </van-row>
                                <van-row v-show="checkExpended(item)">
                                    <van-col span="10" class="list-row-col">记账日</van-col>
                                    <van-col span="14" class="list-row-col">{{item.Txn_Dt}}</van-col>
                                </van-row>
                                <van-row v-show="checkExpended(item)">
                                    <van-col span="10" class="list-row-col">对方账户</van-col>
                                    <van-col span="14" class="list-row-col">
                                        <van-row>{{item.Cntrprt_Txn_AccNo}}</van-row>
                                        <van-row>{{item.Cntrprt_Txn_AccNo_Nm}}</van-row>
                                    </van-col>
                                </van-row>
                            </van-col>
                            <van-col span="2" class="list-row-col-icon">
                                <i :class="['van-icon van-icon-arrow van-cell__right-icon',checkExpended(item)?'list-row-col-icon-up':'list-row-col-icon-down']"/>
                            </van-col>
                        </van-row>
                    </van-cell>
                </van-list>
            </van-tab>
            <van-tab title="七天">内容 2</van-tab>
            <van-tab title="一个月">内容 3</van-tab>
            <van-tab title="更多筛选"></van-tab>
        </van-tabs> -->
        <div class="tabtitle">
            <span @click="renderList('now')" :class="{'clickactive':styleFlag=='now'}">当天</span>
            <span @click="renderList('sevenDay')" :class="{'clickactive':styleFlag=='sevenDay'}">七天</span>
            <span @click="renderList('oneMonth')" :class="{'clickactive':styleFlag=='oneMonth'}">一个月</span>
            <span @click="renderList('screen')" :class="{'clickactive':styleFlag=='screen'}">更多筛选</span>
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了"  :immediate-check="true"
        :error.sync="errorFlag" error-text="请求失败，点击重新加载"
            @load="onLoad" offset="10">
            <van-cell v-for="(item,index) in list" :key="index" @click="change(item)">
                <van-row>
                    <van-col span="6">
                        <van-row class="list-row-col">{{item.Txn_Dt|returnDay}}</van-row>
                        <van-row class="list-row-col">{{item.Txn_Dt}}</van-row>
                    </van-col>
                    <van-col span="16" class="list-row-col">
                        <van-row>
                            <van-col span="10" class="list-row-col">{{item.dealType}}</van-col>
                            <van-col span="14" class="list-row-col">{{item.dealNum}}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="10" class="list-row-col">余额</van-col>
                            <van-col span="14" class="list-row-col">{{item.Dep_AcBa}}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="10" class="list-row-col">摘要</van-col>
                            <van-col span="14" class="list-row-col">冲正</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="10" class="list-row-col">交易地点/附言</van-col>
                            <van-col span="14" class="list-row-col">冲正</van-col>
                        </van-row>
                        <van-row v-show="checkExpended(item)">
                            <van-col span="10" class="list-row-col">交易时间</van-col>
                            <van-col span="14" class="list-row-col">{{item.Txn_Lcl_Dt+" "+item.Txn_Lcl_Tm}}</van-col>
                        </van-row>
                        <van-row v-show="checkExpended(item)">
                            <van-col span="10" class="list-row-col">记账日</van-col>
                            <van-col span="14" class="list-row-col">{{item.Txn_Dt}}</van-col>
                        </van-row>
                        <van-row v-show="checkExpended(item)">
                            <van-col span="10" class="list-row-col">对方账户</van-col>
                            <van-col span="14" class="list-row-col">
                                <van-row v-show="item.Cntrprt_Txn_AccNo">{{item.Cntrprt_Txn_AccNo}}</van-row>
                                <van-row>{{item.Cntrprt_Txn_AccNo_Nm}}</van-row>
                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="2" class="list-row-col-icon">
                        <i :class="['van-icon van-icon-arrow van-cell__right-icon',checkExpended(item)?'list-row-col-icon-up':'list-row-col-icon-down']"/>
                    </van-col>
                </van-row>
            </van-cell>
        </van-list>






        <van-popup v-model="show" position="right" :style="{ height: '87%', width:'80%'}" :round="true">
            <van-nav-bar title="请选择充值银行账户" @click-left="closeRightPage">
                <van-icon name="cross" slot="left" />
            </van-nav-bar>
            <van-row style="margin:.2rem .1rem;font-size:.14rem">查询时间</van-row>
            <div class="start_end_time">
                <span @click="startClick">{{startTime?startTime:"开始"}}</span>
                <span @click="endClick">{{endTime?endTime:"结束"}}</span>
            </div>
            <van-row style="margin:.2rem .1rem;font-size:.14rem">收支类型</van-row>
            <div class="income_type">
                <i @click="btnClick('0')" :class="{'btn-mini':btnFlag==='0'}">全部</i>
                <i @click="btnClick('1')" :class="{'btn-mini':btnFlag==='1'}">收入</i>
                <i @click="btnClick('2')" :class="{'btn-mini':btnFlag==='2'}">支出</i>
            </div>
            <van-row class="bottom-row">
                <van-col span="12">
                <van-button class="btn-mini" @click="reset">重置</van-button>
                </van-col>
                <van-col span="12">
                <van-button class="btn-mini" @click="clickConfig">确认</van-button>
                </van-col>
            </van-row>
            <van-popup v-model="timeSelect" position="bottom" :style="{ height: '35%'}" :overlay="false">
                <van-datetime-picker
                v-model="currentDate"
                type="date"
                @confirm="confirm"
                @cancel="cancel"
                :visible-item-count="3"
                :formatter="formatter"
                />
            </van-popup>
        </van-popup>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0,
            show: false,
            bankCardTitle: "bankCardTitleStyle",
            startTime: "",
            endTime: "",
            timeSelect: false,
            currentDate: new Date(),
            btnFlag: "0",
            startEnd: "0", //0代表开始,1代表结束
            list: [],
            dealList:[],
            loading: false,
            finished: false,
            showRow: -1,
            showIndex: 0,
            expendedList: [],
            styleFlag:"now",
            pageSize:0,
            requestFlag:true,
            IcmEpd_TpCd:"",
            errorFlag:false,
            // initData:null,
        };
    },
    methods: {
        // tabClick(val) {
        //     console.log(val);
        //     if (val === 3) {
        //         this.show = true;
        //     }
        // },
        back() {//返回
            this.$router.go(-1); //返回上一层
        },
        closeRightPage() {//侧边栏筛选 左上角关闭按钮
            this.show = false;
        },
        // getContainer() {
        //   return document.querySelector('.van-popup--right')
        // },
        startClick() {//侧边栏筛选 点击开始
            this.timeSelect = true;
            this.startEnd = "0";
        },
        endClick() {//侧边栏筛选 点击结束
            this.timeSelect = true;
            this.startEnd = "1";
        },
        confirm(val) {//侧边栏筛选 时间选择器确定按钮
            this.timeSelect = false;
            let time = new Date(val);
            let year = time.getFullYear();
            let month = time.getMonth()+1;
            let day = time.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            let timeString = ""+year + month + day;
            if (this.startEnd === "0") {
                this.startTime = timeString;
            } else {
                this.endTime = timeString;
            }
        },
        cancel() {//侧边栏筛选 时间选择器取消按钮
            this.timeSelect = false;
        },
        formatter(type, value) {//侧边栏筛选 处理时间选择器中显示的数据
            if (type === "year") {
                return `${value}年`;
            } else if (type === "month") {
                return `${value}月`;
            } else {
                return `${value}日`;
            }
            return value;
        },
        btnClick(val) {//点击选择收支类型
            this.btnFlag = val;
            this.IcmEpd_TpCd=val=="0"?"":"0"+val
        },
        reset() {//重置
            this.btnFlag = "0";
            this.startTime = "开始";
            this.endTime = "结束";
            this.errorFlag=false
        },
        onLoad() {//页面滑到距离最底部10px的时候 加载后面的数据
            // 异步更新数据
            setTimeout(() => {
                console.log("进入检测列表高度")
                this.getDetailMsg()
            }, 500);
        },
        change(index) {//点击单条数据中的箭头 
            this.showRow = index;
            this.showIndex = index;
            let num = this.expendedList.indexOf(index);
            if (num === -1) {
                this.expendedList.push(index);
            } else {
                this.expendedList.splice(num, 1);
            }
        },
        checkExpended(index) {//隐藏显示信息
            if (this.expendedList.indexOf(index) === -1) {
                return false;
            } else {
                return true;
            }
        },
        getDetailMsg(){//数据请求函数
            if (!this.requestFlag) {
                return
            }
            this.requestFlag=false
            this.loading = true;
            this.finished = false
            console.log("进入调用接口函数")
            let params={
                "DbCrd_CardNo": this.$store.state.dataC100.Data.DbCrd_CardNo,//借记卡卡号
                "TrdPt_Sign_Agrm_ID":"",//第三方签约协议编号
                "Beg_Enqr_Dt": this.startTime,//起始查询时间
                "CtOf_Enqr_Dt": this.endTime,//结束查询时间
                "CcyCd": "156",//币种代码
                "CshEx_Cd": "1",//钞汇代码
                "Seq_Fld_Ind":"1",//排序字段处理标志
                "Fllw_Pcsg_Ind": "",//后续处理标志
                "Enqr_TpDs":"",//查询类型描述
                "IcmEpd_TpCd":this.IcmEpd_TpCd,//收支类型代码
                "REC_IN_PAGE":"10",
                "PAGE_JUMP":""+this.pageSize
            }
            this.pageSize++
            console.log("详情接口查询入参",params)
            this.$http("/LifeSvc/DigtAccWlt/DAWDigtAccOutbndCDtlEnqr","P5OISC108",params,false,false)
            .then(res=>{
                // this.moneyNum=res.Data.Avl_Bal
                console.log("银行卡明细请求成功",res)
                this.requestFlag=true
                this.loading = false;
                // this.DbCrd_CardNo=res.Data.DbCrd_CardNo
                this.dealList=[]
                if (res.Data.PRIM_ACC_ACG_DTL) {
                    res.Data.PRIM_ACC_ACG_DTL.forEach(item => {
                        if (item.Cntrprt_Txn_AccNo) {
                            var endBankNo=item.Cntrprt_Txn_AccNo.slice(item.Cntrprt_Txn_AccNo.length-4,item.Cntrprt_Txn_AccNo.length)
                            var startBankNo=item.Cntrprt_Txn_AccNo.slice(0,4)
                            item.Cntrprt_Txn_AccNo=startBankNo+"****"+endBankNo
                        }
                        //时间
                        var s=item.Txn_Lcl_Tm.slice(4,6)
                        var m=item.Txn_Lcl_Tm.slice(2,4)
                        var h=item.Txn_Lcl_Tm.slice(0,2)
                        item.Txn_Lcl_Tm=h+":"+m+":"+s  
                            // item.Dep_Cr_HpnAm
                        if (item.Dep_DHAmt/1>0&&item.Dep_Cr_HpnAm==0) {
                            item.deatStyle=false
                            item.dealType="支出"
                            item.dealNum=item.Dep_DHAmt
                        }
                        if (item.Dep_DHAmt/1==0&&item.Dep_Cr_HpnAm>0) {
                            item.deatStyle=true
                            item.dealType="收入"
                            item.dealNum=item.Dep_Cr_HpnAm
                        }
                        if (item.Dep_DHAmt/1<0&&item.Dep_Cr_HpnAm==0) {
                            item.deatStyle=true
                            item.dealType="收入"
                            item.dealNum=-item.Dep_DHAmt
                        }
                        if (item.Dep_DHAmt/1==0&&item.Dep_Cr_HpnAm<0) {
                            item.deatStyle=false
                            item.dealType="支出"
                            item.dealNum=-item.Dep_Cr_HpnAm
                        }
                        // if (item.Txn_Dt>=this.startTime&&item.Txn_Dt<=this.endTime) {
                            this.dealList.push(item)   
                        // }
                    });
                    this.dealList.forEach(item=>{
                        this.list.push(item)
                    })
                }
                
                if (this.dealList.length<10) {
                    this.finished = true;
                }else{
                    this.finished = false
                }
                this.$store.commit("detailPageData_Change",res)
                // this.$router.push("/detail") 
                console.log('this.dealList',this.dealList)       
            }).catch(err=>{
                this.requestFlag=true
                this.loading = false;
                this.errorFlag=true
                console.log("银行卡明细请求失败",err)
            })
           
        },
        disDate(val){//处理时间函数
            var date1=new Date()
            var date2=new Date(date1)
            date2.setDate(date1.getDate()+val)
            var time=""+date2.getFullYear()+((date2.getMonth()+1)>9?(date2.getMonth()+1):"0"+(date2.getMonth()+1))+(date2.getDate()>9?date2.getDate():"0"+date2.getDate())
            return time   
        },
        renderList(val){//点击导航栏
            console.log("点击头部")
            this.styleFlag=val;
            this.list=[]
            this.dealList=[]
            this.pageSize=0
            this.requestFlag=true
            this.finished = false
            this.errorFlag=false
            
            if (val=="now") {
                this.startTime=this.disDate(0)
                this.endTime=this.disDate(0)
                this.IcmEpd_TpCd=""
                this.btnFlag = "0";
                this.getDetailMsg()
            }
            if (val=="sevenDay") {
                this.startTime=this.disDate(-7)
                this.endTime=this.disDate(0)
                this.IcmEpd_TpCd=""
                this.btnFlag = "0";
                this.getDetailMsg()
            }
            if (val=="oneMonth") {
                this.startTime=this.disDate(-30)
                this.endTime=this.disDate(0)
                this.IcmEpd_TpCd=""
                this.btnFlag = "0";
                this.getDetailMsg()
            }
            if (val=="screen") {
                this.show = true;
                this.finished = true
            }
            
            
        },
        clickConfig(){//侧边筛选 确定按钮
            if (isNaN(this.startTime/1)||isNaN(this.endTime/1)) {
                return
            }
            // console.log(isNaN(this.startTime/1),this.endTime)
            this.getDetailMsg()
            this.show=false;
        }
       
    },
    mounted(){
        // this.$store.state.initData=JSON.parse(this.$store.state.initData)
    },
    created(){
        this.startTime=this.disDate(0)
        this.endTime=this.disDate(0)
        // this.getDetailMsg()  
    },
    filters:{
        returnDay(val){
            var m=new Date(val.replace(/^(\d{4})(\d{2})(\d{2})/,"$1-$2-$3"))
            if (m.getDay()==0) {return '周日'}
            if (m.getDay()==1) {return '周一'}
            if (m.getDay()==2) {return '周二'}
            if (m.getDay()==3) {return '周三'}
            if (m.getDay()==4) {return '周四'}
            if (m.getDay()==5) {return '周五'}
            if (m.getDay()==6) {return '周六'}
        },
    }
};
</script>
<style scoped>
    .bankCardTitleStyle {
        background-color: #09b6f2;
        color: #fff;
        text-align: center;
    }
    .van-button--default {
        border: 0.01rem solid #ebedf0;
        width: 80%;
    }
    .van-col {
        text-align: center;
    }
    .btn-mini {
        color: #09b6f2;
        border-color: #09b6f2;
    }
    .bottom-row {
        position: absolute;
        bottom: 1rem;
        width: 100%;
    }
    .top-three-row {
        min-height: 0.4rem;
    }
    .top-three-row-col {
        text-align: left;
        padding: 0.1rem 0.16rem;
    }
    .list-row-col {
        text-align: left;
    }
    .list-row-col-icon-down {
        transform: rotate(90deg);
    }
    .list-row-col-icon-up {
        transform: rotate(-90deg);
    }
    .start_end_time {
        display: flex;
        justify-content: space-around;
    }
    .start_end_time span {
        font-size: 0.14rem;
        border: 1px solid #f3f4f5;
        border-radius: 0.04rem;
        line-height: 0.5rem;
        width: 1rem;
        text-align: center;
    }
    .income_type {
        display: flex;
        justify-content: space-around;
    }
    .income_type i {
        display: block;
        width: 0.7rem;
        font-size: 0.12rem;
        line-height: 0.22rem;
        border: 0.01rem solid #f3f4f5;
        text-align: center;
    }
    .account_detail {
        font-size: 0.14rem;
        padding: 0.14rem;
    }
    .account_detail div {
        display: flex;
    }
    .account_detail div span {
        flex: 1;
        line-height: 0.3rem;
    }

    .tabtitle{
        color: #333;
        font-size: .14rem;line-height: .3rem;
        display: flex;justify-content: space-around;align-items:center;
        border-top: .01rem solid #ededed;border-bottom: .01rem solid #ededed;
    }
    .tabtitle span{
        padding: 0 .05rem;
    }       
    .clickactive{
        border-bottom:0.02rem solid #09b6f2;color: #09b6f2;
    }

</style>
