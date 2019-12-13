import Vue from "vue"
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/walletMenu',
            name:"walletMenu",
            component:resolve =>require(['@/view/walletAccount/walletMenu.vue'], resolve)
        }, 
        {
            path: '/recharge',
            name:"recharge",
            component: resolve =>require(['@/view/walletAccount/Recharge.vue'], resolve)
        }, 
        {
            path: '/verifyCode',
            name:"verifyCode",
            component: resolve =>require(['@/view/walletAccount/VerifyCode.vue'], resolve)
        }, 
        {
            path: '/bankCard',
            name:"bankCard",
            component: resolve =>require(['@/view/walletAccount/BankCard.vue'], resolve)
        },
        {
            path: '/detail',
            name:"detail",
            component: resolve =>require(['@/view/walletAccount/Detail.vue'], resolve)
        },
        {
            path: '/security',
            name:"security",
            component: resolve =>require(['@/view/walletAccount/Security.vue'], resolve)
        },
        {
            path: '/withdrawDeposit',
            name:"withdrawDeposit",
            component: resolve =>require(['@/view/walletAccount/withdrawDeposit.vue'], resolve)
        },
        {
            path:"/loadErr",
            name:'loadErr',
            component: resolve =>require(['@/view/walletAccount/loadErr.vue'], resolve)
        },
        {
            path:"/walletMain",
            name:'walletMain',
            component: resolve =>require(['@/view/walletMain.vue'], resolve)
        },
        {
            path:"/addBankMsg",
            name:"addBankMsg",
            component: resolve =>require(['@/view/walletAccount/addBankMsg.vue'], resolve)
        },
        // {
        //     path:"/verificationCode",
        //     name:"verificationCode",
        //     component: resolve =>require(['@/view/walletAccount/verificationCode.vue'], resolve)
        // },
        {
            path:"/timeOut",
            name:"timeOut",
            component: resolve =>require(['@/view/walletAccount/timeOut.vue'], resolve)
        },
        {
            path:"/payManage",
            name:"payManage",
            component: resolve =>require(['@/view/walletAccount/payManage.vue'], resolve)
        },
        {
            path:"/modPhoneNum",
            name:"modPhoneNum",
            component: resolve =>require(['@/view/walletAccount/modPhoneNum.vue'], resolve)
        },
        {
            path:"/modFormInput",
            name:"modFormInput",
            component: resolve =>require(['@/view/walletAccount/modFormInput.vue'], resolve)
        },
        {
            path:"/indexBar",
            name:"indexBar",
            component: resolve =>require(['@/view/walletAccount/indexBar.vue'], resolve)
        },{
            path:"/addBankCard",
            name:"addBankCard",
            component: resolve =>require(['@/view/openAccount/addBankCard.vue'], resolve),
            meta:{
                keepAlive:true
            }
        },{
            path:"/testDemo",
            name:"testDemo",
            component: resolve =>require(['@/view/openAccount/testDemo.vue'], resolve),
            meta:{
                keepAlive:true
            }
        },{
            path:"/addPerInfo",
            name:"addPerInfo",
            component: resolve =>require(['@/view/openAccount/addPerInfo.vue'], resolve),
            meta:{
                keepAlive:true
            }
        },{
            path:"/upLoadIdCard",
            name:"upLoadIdCard",
            component: resolve =>require(['@/view/openAccount/upLoadIdCard.vue'], resolve)
        },{
            path:"/openVerifcode",
            name:"openVerifcode",
            component: resolve =>require(['@/view/openAccount/openVerifcode.vue'], resolve)
        },{
            path:"/addUpLoadIdCard",
            name:"addUpLoadIdCard",
            component: resolve =>require(['@/view/openAccount/addUpLoadIdCard.vue'], resolve)
        },{
            path:"/faceRecog",
            name:"faceRecog",
            component: resolve =>require(['@/view/openAccount/faceRecog.vue'], resolve),
            meta:{
                keepAlive:true
            }
        },{
            path:"/etcContract",
            name:"etcContract",
            component: resolve =>require(['@/view/openAccount/contracts/etcContract.vue'], resolve),
            meta:{
                keepAlive:false
            }
        }
        
        // {
        //     path:"/modPhoneVerifyCode",
        //     name:"modPhoneVerifyCode",
        //     component: resolve =>require(['@/view/walletAccount/modPhoneVerifyCode.vue'], resolve)
        // }
    ]
})


