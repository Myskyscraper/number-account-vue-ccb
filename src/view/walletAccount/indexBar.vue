<template>
    <div id="textmodel">
        <div class="header">
            <i @click="goBack"></i>
            <van-search placeholder="城市名/拼音" v-model="inputValue" style="width:2.5rem;height:.4rem;" @input="searchCity"/>
        </div>
        <div class="activecity">
            <div>当前城市</div>
            <span>{{activeCity?activeCity:"请选择"}}</span>
        </div>
        <van-index-bar :index-list="indexList" :sticky="false">
            <van-index-anchor index="A" style="background:#ededed;" v-if="indexList.indexOf('A')!=-1">A</van-index-anchor>
            <van-cell  @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.A" :key="index"/>
            
            <van-index-anchor index="B" style="background:#ededed" v-if="indexList.indexOf('B')!=-1">B</van-index-anchor>
            <van-cell @click="clickList(item)"  :title="item.city_name" v-for="(item,index) in indexListData.B" :key="index"/>

            <van-index-anchor index="C" style="background:#ededed" v-if="indexList.indexOf('C')!=-1">C</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.C" :key="index"/>

            <van-index-anchor index="D" style="background:#ededed" v-if="indexList.indexOf('D')!=-1">D</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.D" :key="index"/>

            <van-index-anchor index="E" style="background:#ededed" v-if="indexList.indexOf('E')!=-1">E</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.E" :key="index"/>

            <van-index-anchor index="F" style="background:#ededed" v-if="indexList.indexOf('F')!=-1">F</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.F" :key="index"/>

            <van-index-anchor index="G" style="background:#ededed" v-if="indexList.indexOf('G')!=-1">G</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.G" :key="index"/>

            <van-index-anchor index="H" style="background:#ededed" v-if="indexList.indexOf('H')!=-1">H</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.H" :key="index"/>

            <van-index-anchor index="I" style="background:#ededed" v-if="indexList.indexOf('I')!=-1">I</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.I" :key="index"/>

            <van-index-anchor index="J" style="background:#ededed" v-if="indexList.indexOf('J')!=-1">J</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.J" :key="index"/>

            <van-index-anchor index="K" style="background:#ededed" v-if="indexList.indexOf('K')!=-1">K</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.K" :key="index"/>

            <van-index-anchor index="L" style="background:#ededed" v-if="indexList.indexOf('L')!=-1">L</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.L" :key="index"/>

            <van-index-anchor index="M" style="background:#ededed" v-if="indexList.indexOf('M')!=-1">M</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.M" :key="index"/>

            <van-index-anchor index="N" style="background:#ededed" v-if="indexList.indexOf('N')!=-1">N</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.N" :key="index"/>

            <van-index-anchor index="O" style="background:#ededed" v-if="indexList.indexOf('O')!=-1">O</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.O" :key="index"/>

            <van-index-anchor index="P" style="background:#ededed" v-if="indexList.indexOf('P')!=-1">P</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.P" :key="index"/>

            <van-index-anchor index="Q" style="background:#ededed" v-if="indexList.indexOf('Q')!=-1">Q</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.Q" :key="index"/>

            <van-index-anchor index="R" style="background:#ededed" v-if="indexList.indexOf('R')!=-1">R</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.R" :key="index"/>

            <van-index-anchor index="S" style="background:#ededed" v-if="indexList.indexOf('S')!=-1">S</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.S" :key="index"/>

            <van-index-anchor index="T" style="background:#ededed" v-if="indexList.indexOf('T')!=-1">T</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.T" :key="index"/>

            <van-index-anchor index="U" style="background:#ededed" v-if="indexList.indexOf('U')!=-1">U</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.U" :key="index"/>

            <van-index-anchor index="V" style="background:#ededed" v-if="indexList.indexOf('V')!=-1">V</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.V" :key="index"/>

            <van-index-anchor index="W" style="background:#ededed" v-if="indexList.indexOf('W')!=-1">W</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.W" :key="index"/>

            <van-index-anchor index="X" style="background:#ededed" v-if="indexList.indexOf('X')!=-1">X</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.X" :key="index"/>

            <van-index-anchor index="Y" style="background:#ededed" v-if="indexList.indexOf('Y')!=-1">Y</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.Y" :key="index"/>

            <van-index-anchor index="Z" style="background:#ededed" v-if="indexList.indexOf('Z')!=-1">Z</van-index-anchor>
            <van-cell @click="clickList(item)" :title="item.city_name" v-for="(item,index) in indexListData.Z" :key="index"/>
        </van-index-bar>
    </div>
</template>
<script>
// import CityModel from "./CityModel";
import cityJson from "../../../static/city"
export default {
    name:"",
    data(){
        return {
            indexList:[],
            indexArr:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',"I", 'J', 'K', 'L', 'M', 'N',"O", 'P', 'Q', 'R', 'S', 'T','U',"v", 'W', 'X', 'Y', 'Z'],
            indexListData:{},
            inputValue:"",
            activeCity:"",
            
        }
    },
    components:{},
    props:[],
    created(){
        // console.log("创建后")
        this.activeCity=this.$route.query.city_name
        this.disCityData()
    },
    mounted(){
        // console.log("模板编译组件挂载后")
        // console.log(cityJson)
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
        goBack(){this.$router.go(-1)},
        disCityData(){
            this.indexList=[]
            this.indexArr.forEach(i=>{
                this.indexListData[i]=[]
            })
            cityJson.forEach(item => {
                this.indexArr.forEach(val=>{
                    // this.disPushData(val,item)
                    if (item.city_sx.toUpperCase()[0]==val) {
                        if (this.indexList.indexOf(val)==-1) {
                            this.indexList.push(val)
                        }
                        this.indexListData[val].push(item)
                    }
                })
            });
            console.log(this.indexListData)
        },
        clickList(val){
            console.log("单击列表",val)
            this.activeCity=val.city_name
            this.$router.push({
                path:"/walletMenu",
                query:{
                    city_name:val.city_name,
                    city_code:val.city_code
                }
            })
        },
        searchCity(){
            console.log("搜索",this.inputValue)
            this.indexListData={}
            this.indexList=[]
            this.indexArr.forEach(i=>{
                this.indexListData[i]=[]
            })
            cityJson.forEach(item=>{
                if (item.city_py.toUpperCase().indexOf(this.inputValue.toUpperCase())>-1||item.city_name.indexOf(this.inputValue)>-1||item.city_sx.toUpperCase().indexOf(this.inputValue.toUpperCase())>-1) {
                    this.indexArr.forEach(val=>{
                        // this.disPushData(val,item)
                        if (item.city_sx.toUpperCase()[0]==val) {
                            if (this.indexList.indexOf(val)==-1) {
                                this.indexList.push(val)
                            }
                            this.indexListData[val].push(item)
                        }
                    })
                }
            })
                // console.log(this.indexListData)
        }
    }
    
}
</script>
<style scoped>
    .activecity{
        font-size: .12rem;
        display: flex;flex-direction: column;text-indent: 1em;
        margin-top: .4rem;
    }
    .activecity div{
        line-height: .2rem;background: #ededed;border-bottom: .01rem solid #999;
        color: #999;
    }
    .activecity span{
        line-height: 0.3rem;border-bottom: .01rem solid #999;font-size: .14rem;
    }
    .header{
        position: fixed;background: #fff;height: .4rem;top: 0;right: 0;left: 0;margin: auto;
        display: flex;justify-content: center;align-items: center;z-index: 999
    }
    .header i{
        position: absolute;left: .2rem;top: 0;bottom: 0;margin: auto;
        display: block;width: .15rem;height: .15rem;
        transform:rotate(45deg)
    }
    .header i::before{
        content: "";display: block;width: .02rem;height: .15rem;background: #09b6f2;
        position: absolute;top: 0;right: 0;left: 0;bottom: 0;margin: auto;  
    }
    .header i::after{
        content: "";display: block;width: .15rem;height: .02rem;background: #09b6f2;
        position: absolute;top: 0;right: 0;left: 0;bottom: 0;margin: auto;
    }

</style>


