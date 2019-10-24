1) vue文件介绍
    1.路径:src/view/walletMain.vue  进入项目的首页 调用接口P5OISC100以及获取app初始化数据。当未开户时，调用接口P5OISC122，获取位置
    2.路径:src/view/walletAccount/walletMenu.vue 菜单页 walletMain请求页面完成后跳转的页面,进入页面时若已开户调用P5OISC107，未开户不调用接口
    3.路径:src/view/walletAccount/withdrawDeposit.vue 提现页面
    4.路径:src/view/walletAccount/VerifyCode.vue 短信验证码获取页面。公用页面，根据状态管理中的数值进行判断，调用不同接口
    5.路径:src/view/walletAccount/timeOut.vue 超时页面
    6.修改手机号(页面流程)：
        1>路径:src/view/walletAccount/Security.vue
        2>路径:src/view/walletAccount/modPhoneNum.vue
        3>路径:src/view/walletAccount/modFormInput.vue
    7.路径:src/view/walletAccount/Recharge.vue 充值页面
    8.路径:src/view/walletAccount/payManage.vue 刷脸支付
    9.路径:src/view/walletAccount/loadErr.vue 加载数据失败
    10.路径:src/view/walletAccount/indexBar.vue 城市选择页面
    11.路径:src/view/walletAccount/Detail.vue 账户交易详情页面
    12.路径:src/view/walletAccount/BankCard.vue 银行卡管理页面
    13.路径:src/view/walletAccount/addBankMsg.vue 添加银行卡页面

    14.公共loading图 路径:src/view/mod/loading/loading.vue


2)公共方法src/utils/文件介绍
    1.ccbsk.js
        原项目中digitalAccountMui/js/common/ccbsk.js文件整合而来 将原项目中的所有方法放入到ccbskObj这个对象中，再导出该对象,在主入口文件main.js中引入，并放在vue原型中
        在页面中调用ccbskObj中的方法 例：this.$ccbskObj.setupWebViewJavascriptBridge();

    2.vant.js
        vant ui初始化文件

    3.http.js
        调用接口的方法 在主入口文件中导入 并放入原型中，接口调用方式 例：
            this.$http("/LifeSvc/DigtAccWlt/DAWDigtAccAcBaEnqr","P5OISC107",params,true,true).then(res=>{
                console.log("数据请求成功",res)
            }).catch(err=>{
                console.log("数据请求失败",err)
            }) 
            参数1：路径
            参数2：接口编号
            参数3：入参对象{}
            参数4：调用时是否需要loading图 Boolean
            参数5：请求失败时是否需要跳转到错误页面或超时页面 Boolean


3)loading图唤起方法
    显示：this.$openLoading(str)  参数为loading显示时展示的文字,可不传，默认 “正在加载”
    隐藏：this.$closeLoading()






