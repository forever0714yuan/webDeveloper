<template>
    <div class="cart">
        <van-nav-bar title="购物车" left-arrow>
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>
        <van-swipe-cell>
            <van-card title="HUAWEI Mate 30 Pro 双4000万徕卡电...">
                <template #thumb>
                    <van-row style="height: 100%;">
                        <van-col span="6">
                            <van-checkbox style="height: 100%" :name="1"></van-checkbox>
                        </van-col>
                        <van-col span="18">
                            <van-image width="88" src="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
                        </van-col>
                    </van-row>
                </template>
                <template #title>
                    <div class="header">
                        <span class="cart-title">HUAWEI Mate 30 Pro 双4000万徕卡电...</span>
                        <span class="van-card__num">x1</span>
                    </div>
                </template>
                <template #price>
                    <span>¥ 1</span>
                </template>
                <template #num>
                    <van-stepper input-width="30px" button-size="25px" v-model="value" />
                </template>
            </van-card>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" />
            </template>
        </van-swipe-cell>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart'


const value = ref(1);
</script>

<style lang="less">
.cart-title {
    display: inline-block;
    font-size: 12px;
    font-weight: bold;
    width: 90%;
}

.header {
    margin-top: 10px;
}

.van-card__thumb {
    width: 35%;
}

.delete-button {
    height: 100%;
}
</style>