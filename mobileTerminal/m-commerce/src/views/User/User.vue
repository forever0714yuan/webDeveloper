<template>
    <div class="user">
        <!-- 头部 -->
        <van-nav-bar title="我的" left-arrow @click-left="router.back()">
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>
        <!-- 信息 -->
        <div class="user-card">
            <div class="user-info">
                <img src="http://nllcoder.com:8016/assets/user.4e805bae.png">
                <div class="user-desc">
                    <span>{{ user.nickName }}</span>
                    <span>{{ user.loginName }}</span>
                    <span>{{ user.introduceSign }}</span>
                </div>
            </div>
        </div>

        <van-cell title="我的订单" is-link to="/order" />
        <van-cell title="账号管理" is-link to="/setting" />
        <van-cell title="地址管理" is-link :to="{ path: '/address', query: { from: 'user' } }" />
        <van-cell title="关于我们" is-link to="/about" />

        <Tabber></Tabber>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import Tabber from '@/components/Tabber.vue';
import { reqUser } from '@/api'
const router = useRouter();
const user = ref({})
// 加载数据
const loadData = async () => {
    const res = await reqUser('/user/info')
    const { data, resultCode } = res.data
    if (resultCode === 200) {
        user.value = data
    }
}

loadData()



</script>

<style lang="less" scoped>
.user-card {
    height: 120px;
    margin: 0 10px 10px;
    background: linear-gradient(90deg, #c62722, #ef5e53);
    box-shadow: 0 0.53333vw 1.06667vw #c62722;
    border-radius: 10px;

    .user-info {
        display: flex;
        padding: 25px 20px;
        box-sizing: border-box;

        img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }

        .user-desc {
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            color: #fff;
            font-size: 14PX;
            line-height: 22px;
        }
    }
}
</style>