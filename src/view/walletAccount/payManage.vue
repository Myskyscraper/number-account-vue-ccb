<template>
    <div>
        <van-nav-bar title="刷脸支付" left-arrow @click-left="back" />
        <div class="facebox">
            <div class="openface">
                <span>开启刷脸支付</span>
                <van-switch v-model="checked" />
            </div>
            <p>如不开启，系统将自动选择支付方式</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            checked:false,
        };
    },
    created() {
           
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
    },
    watch: {}
};
</script>
<style scoped>
    .facebox{
        position: fixed;top: .4rem;right: 0;left: 0;bottom: 0;margin: auto;
        background: #f3f4f5;
    }
    .openface{
        height: .4rem;background: #fff;margin-top: .15rem;font-size: .14rem;color: #000;
        display: flex;justify-content: space-between;align-items: center;padding: 0 .2rem;
        line-height: .4rem
    }
    p{
        font-size: .12rem;color: #999;padding: 0 .2rem;line-height: .3rem;
    }

</style>
