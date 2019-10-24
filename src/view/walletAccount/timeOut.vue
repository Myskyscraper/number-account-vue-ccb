<template>
    <div id="timeout">
        <!-- <header class="mui-bar mui-bar-nav">
			<div id="ccb-header">
				<h1 class="mui-title"></h1>
			</div>
			<p class=" mui-right-nav mui-pull-right" onclick="javascript:history.go(-1)">返回</p>
		</header>

		<div class="mui-content">
			<div class='top'>
				<div class='top-blue'></div>
				<img src="../../../assets/images/fail.png" alt="" />
				<p class='word'>尊敬的客户，系统超时，请稍后再试</p>
				<div style="height:20px;">

				</div>
				<div class='fail-code'><p id="errInfo"></p></div>
			</div>		
		</div> -->
        <div class="title">
            <span>返回</span>
        </div>
        <div class="errimg">
            <img src="../../assets/images/fail.png" alt="" />
        </div>
        <div class="distext">
            尊敬的客户，系统超时，请稍后再试
        </div>
    </div>
</template>
<script>
// import CityModel from "./CityModel";
export default {
    name:"",
    data(){
        return {
                
        }
    },
    components:{},
    props:[],
    created(){
        // console.log("创建后")
    },
    mounted(){
        // console.log("模板编译组件挂载后")
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
    methods:{
        back(){

        }
    }
    
}
</script>
<style scoped>
  .title{
      height: .44rem;background: #09b6f2;
  }
  .title span{
      font-size: .15rem;line-height: .44rem;margin-right: .1rem;color: #fff;float: right;
  }
  .errimg{
      height: .7rem;background: #09b6f2;position: relative;
  }
  .errimg img{
      width: 1rem;height: 1rem;position: absolute;
      top: .2rem;right: 0;left: 0;margin: auto;
  }
  .distext{
      font-size: .18rem;line-height: 1.4rem;text-align: center;color: #09b6f2;
  }
</style>


