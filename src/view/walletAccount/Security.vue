<template>
    <div>
        <van-nav-bar title="安全管理" left-arrow @click-left="back" />
        <div class="phonenum" @click="modPhone">
            <span>手机号</span>
            <div>
                <span>{{this.$store.state.dataC100.Data.MblPh_No|phonefilter}}</span>
                <i></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
           
        };
    },
    created() {
            // console.log(addrData);
            // this.columns=addrData
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        modPhone(){
            this.$router.push("/modPhoneNum")
        }
      
       
          
    },
    watch: {},
    filters:{
       phonefilter(val){
           return val.slice(0,4)+"****"+val.slice(val.length-3,val.length)
       } 
    },
};
</script>
<style scoped>
    .phonenum{
        background: #f3f4f5;
        font-size: .15rem;display: flex;justify-content: space-between;
        padding: 0 12px;align-items: center;
        height: .4rem;margin-top: .14rem;

    }
    .phonenum div{
        display: flex;justify-content: space-between;align-items: center;width: 1.1rem;
    }
    .phonenum div i{
        display: block;width: .1rem;height: .1rem;
        border-right: .01rem solid #000;border-top: .01rem solid #000;
        transform: rotate(45deg)
    }
    /* .phonenum div i::after{
        content: "";width: .14rem 
    }
    .phonenum div i::before{

    } */
</style>