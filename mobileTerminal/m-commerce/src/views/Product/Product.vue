<template>
    <div class="product">
        <van-nav-bar title="商品详情" @click-left="router.back()" left-arrow>
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>
        <div class="detail">
            <div class="product-info">
                <div class="product-title">{{ productDetail.goodsName }}</div>
                <div class="product-desc"> 免邮费 顺丰快递 </div>
                <div class="product-price"> ¥{{ productDetail.originalPrice }}</div>
            </div>
            <div class="product-intro">
                <ul>
                    <li>概述</li>
                    <li>参数</li>
                    <li>安装服务</li>
                    <li>常见问题</li>
                </ul>
            </div>
            <div class="product-content">
                <div class="product-img">
                    <img src="https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/huawei-3.jpg">
                    <img src="https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/huawei-3.jpg">
                    <!-- <img :src="'http://localhost:28019' + productDetail.goodsCoverImg"> -->
                    <!-- <img src="https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/huawei-3.jpg"> -->
                </div>
            </div>
        </div>
        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服" />
            <van-action-bar-icon icon="cart-o" to="/cart" text="购物车" />
            <van-action-bar-button type="warning" text="加入购物车" @click="addCart(productDetail)" />
            <van-action-bar-button type="danger" text="立即购买" />
        </van-action-bar>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { reqProductDetail } from '@/api';
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();
const { addCart } = useCartStore();

const productDetail = ref({})


// 加载数据
const loadData = async () => {
    const id = route.params.id;
    const res = await reqProductDetail(`/goods/detail/${id}`);
    console.log(res.data);
    const { data, resultCode } = res.data
    if (resultCode === 200) {
        productDetail.value = data;
    }
};

loadData()
// console.log(productDetail);
</script>

<style lang="less" scoped>
div {
    box-sizing: border-box;
}

.product {
    background-color: #f1f1f1;
}

.detail {
    .product-info {
        padding: 18px 10px 0;

        .product-title {
            font-size: 18PX;
            text-align: left;
            color: #333;
        }

        .product-desc {
            font-size: 14PX;
            text-align: left;
            color: #999;
            padding: 5px 0;
        }

        .product-price {
            color: #f63515;
            font-size: 18PX;
        }
    }

    .product-intro {
        width: 100%;


        ul {
            display: flex;

            li {
                flex: 1;
                padding: 10px 0;
                text-align: center;
                font-size: 14PX;
                border-right: 1PX solid #999;
                box-sizing: border-box;
            }
        }
    }

    .product-content {
        padding: 20px 0 0;
        margin-bottom: 45PX;

        .product-img {

            img {
                width: 100%;
            }
        }
    }
}
</style>