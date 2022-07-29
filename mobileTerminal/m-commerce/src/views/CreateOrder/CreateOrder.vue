<template>
    <div class="createorder">
        <van-nav-bar title="生成订单" left-arrow @click-left="router.back()">
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>

        <van-contact-card type="add" @click="onAdd" />

        <van-swipe-cell>
            <van-card v-for="item in newArr" :key="item.cartItemId">
                <template #thumb>
                    <van-image width="88" :src="'http://localhost:28019/' + item.goodsCoverImg" />
                </template>
                <template #title>
                    <div class=" order-header">
                        <span class="order-title">{{ item.goodsName }}</span>
                        <span class="van-card__num">x{{ item.goodsCount }}</span>
                    </div>
                </template>
                <template #price>
                    <span class="order-price">¥ {{ item.sellingPrice }}</span>
                </template>
            </van-card>
        </van-swipe-cell>

        <div class="footer">
            <div class="item">
                <span>商品金额</span>
                <span class="price">¥{{ getCountPrice }}</span>
            </div>
            <van-button class="pay-btn" color="#c62722" type="primary" block @click="handleCreateOrder">生成订单
            </van-button>
        </div>
        <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" close-on-click-action />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
const router = useRouter();
const show = ref(false)

const { loadCart } = useCartStore();

const zfb = () => {
    console.log('zfb');
}
const wx = () => {
    console.log('wx');
}

const actions = ref([
    { name: '支付宝支付', callback: zfb },
    { name: '微信支付', callback: wx }
])

const handleCreateOrder = () => {
    show.value = !show.value
}

loadCart()
const onAdd = () => {
    console.log('111');
};

const { cart, getCountPrice, newArr } = storeToRefs(useCartStore());

console.log(cart);

</script>

<style lang="less" scoped>
.order-header {
    margin-top: 10px;
}

.order-price {
    font-size: 16PX;
}

.footer {
    border-top: 1px solid #e9e9e9;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
}

.footer .item {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 10px 5%;
}

.footer .item .price {
    font-size: 16px;
    color: red;
}

.footer .pay-btn {
    width: 90%;
    margin: 0 auto;
}

.pay-content {
    width: 90%;
    padding: 50px 0;
    margin: 0 auto;
}
</style>