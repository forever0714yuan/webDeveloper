<template>
    <div class="cart">
        <van-nav-bar title="购物车" left-arrow @click-left="router.back()">
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>
        <van-checkbox-group v-model="checked" @change="handleItemChanged">
            <van-swipe-cell v-for="goodItem in cart" :key="goodItem.goodsId">
                <van-card>
                    <template #thumb>
                        <van-row style="height: 100%;">
                            <van-col span="6">
                                <van-checkbox style="height: 100%" :name="goodItem.cartItemId">
                                </van-checkbox>
                            </van-col>
                            <van-col span="18">
                                <!-- <van-image width="88" src="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" /> -->
                                <van-image width="88" :src="'http://localhost:28019/' + goodItem.goodsCoverImg" />
                            </van-col>
                        </van-row>
                    </template>
                    <template #title>
                        <div class="cart-header">
                            <span class="cart-title">{{ goodItem.goodsName }}</span>
                            <span class="van-card__num">x{{ goodItem.goodsCount }}</span>
                        </div>
                    </template>
                    <template #price>
                        <span>¥ {{ goodItem.sellingPrice }}</span>
                    </template>
                    <template #num>
                        <van-stepper input-width="30px" max="5" :name="goodItem.cartItemId" button-size="25px"
                            v-model="goodItem.goodsCount" @change="handleChange" />
                    </template>
                </van-card>
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" @click="handleDelete(goodItem)" />
                </template>
            </van-swipe-cell>
        </van-checkbox-group>

        <div v-if="cart.length === 0" class="empty-cart">
            <img src="../../assets/images/empty-car.png" alt="">
            <p>购物车空空如也</p>
            <van-button round block type="primary">前往选购</van-button>
        </div>

        <van-submit-bar :price="getCountPrice * 100" button-text="提交订单" @submit="onSubmit">
            <van-checkbox @click="checkAll" v-model="checkAllClick">全选</van-checkbox>
        </van-submit-bar>

        <Tabber></Tabber>
    </div>
</template>

<script setup>
import { Toast } from 'vant';
import 'vant/es/toast/style';

import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import Tabber from '@/components/Tabber.vue';




// 4.增加数量 handleChange
const { handleChange, handleDelete } = useCartStore();
const { cart, getCountPrice, checked } = storeToRefs(useCartStore());
const router = useRouter();
// 全选
// const checked = ref([]);
const checkAllClick = ref(false);



// 2.全选
const checkAll = () => {
    if (checkAllClick.value) {
        checked.value = cart.value?.map(item => {
            return item.cartItemId
        });
    } else {
        checked.value = []
    }
}
// 3.单选选中所有的  全选按钮置为true
const handleItemChanged = () => {
    checkAllClick.value = cart.value?.length === checked.value?.length;
}

const onSubmit = () => {
    if (checked.value?.length === 0) {
        return Toast.fail('请选择需要结算的商品')
    }
    router.push('/createorder')
}
</script>

<style lang="less">
.cart-title {
    display: inline-block;
    font-size: 12px;
    font-weight: bold;
    width: 90%;
}

.cart-header {
    margin-top: 10px;
}

.van-card__thumb {
    width: 35%;
}

.van-submit-bar {
    margin-bottom: 50px;
}

.delete-button {
    height: 100%;
}
</style>