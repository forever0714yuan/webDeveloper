<template>
    <div class="order">
        <van-nav-bar fixed title="我的订单" @click-left="router.back()" left-arrow>
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>

        <van-tabs class="tab" @click-tab="onClickTab">
            <van-tab title="全部">
                <van-pull-refresh v-model="loading" @refresh="onRefresh">
                    <div class="no" v-if="list">没有更多了</div>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="待付款">
                <van-pull-refresh v-model="loading" @refresh="onRefresh">
                    <div class="no" v-if="list">没有更多了</div>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="待确认">
                <van-pull-refresh v-model="loading" @refresh="onRefresh">
                    <div class="no" v-if="list">没有更多了</div>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="待发货">
                <van-pull-refresh v-model="loading" @refresh="onRefresh">
                    <div class="no" v-if="list">没有更多了</div>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="已发货">
                <van-pull-refresh v-model="loading" @refresh="onRefresh">
                    <div class="no" v-if="list">没有更多了</div>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="交易完成">
                <van-pull-refresh v-model="loading" @refresh="onRefresh">
                    <div class="no" v-if="list">没有更多了</div>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script setup>
// 引入vue
import { ref } from 'vue';
// 引入Toast
import { Toast } from 'vant';
import 'vant/es/toast/style';

// 引入请求方法
import { reqOrder } from '@/api'

// 引入路由
import { useRouter } from 'vue-router';
const router = useRouter();

// 刷新
const loading = ref(false);
const onRefresh = () => {
    setTimeout(() => {
        Toast('刷新成功');
        loading.value = false;
    }, 1000);
};

// 点击切换tabbar
const list = ref({});
const onClickTab = async (tabValue) => {
    // console.log(tabValue);
    const res = await reqOrder('/order', {
        query: {
            status: tabValue.name - 1
        }
    })
    console.log(res);
    list.value = res.data;
}



</script>

<style lang="less" scoped>
.tab {
    margin-top: 46px;
}

.no {
    color: #969799;
    font-size: 14px;
    line-height: 50px;
    height: 50px;
    text-align: center;
}
</style>