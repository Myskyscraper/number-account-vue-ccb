<template>
    <div>
        <van-nav-bar title="修改手机号" left-arrow @click-left="back" />
        <div class="modphone">
            <img src="./../../assets/images/security_center/tel.png" alt="" class="modimg">
            <p>
                你的手机号：{{this.$store.state.dataC100.Data.MblPh_No|phonefilter}}
            </p>
            <div class="modbtn" @click="pushDetailInput($event)">
                修改手机号码
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
        pushDetailInput(e){
            // console.log(e.srcElement)
            e.srcElement.style.background="#999"
            this.$router.push("/modFormInput")
            setTimeout(() => {
               e.srcElement.style.background="#fff" 
            }, 400);
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
    .modphone{
        position: fixed;top: .4rem;bottom: 0;right: 0;left: 0;margin: auto;background: #f3f4f5
    }
    .modimg {
        width: .6rem;display: block;margin: .2rem auto;margin-top: .4rem;
    }
    .modphone p{
        text-align: center;font-size: .14rem;
    }
    .modbtn{
        font-size: .16rem;color: #09b6f2;padding: .05rem 0 ;border-radius: .05rem;background: #fff;margin: .3rem auto;
        width: 1.2rem;text-align: center;
    }
</style>
