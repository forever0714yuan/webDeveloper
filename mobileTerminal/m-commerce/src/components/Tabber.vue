<template>
    <van-tabbar v-model="active" @change="onChange" route>
        <van-tabbar-item icon="home-o" to="/">
            <template #icon>
                <i class="iconfont miconxuanzhongshangcheng"></i>
            </template>
            <span>
                首页
            </span>
        </van-tabbar-item>
        <van-tabbar-item icon="search" to="/category">
            <template #icon>
                <i class="iconfont miconsort"></i>
            </template>
            <span>
                分类
            </span>
        </van-tabbar-item>
        <van-tabbar-item icon="friends-o" :badge="getCountNum" to="/cart">
            <template #icon>
                <i class="iconfont miconFontAwesomecartarrowdown"></i>
            </template>
            <span>
                购物车
            </span>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/user">
            <template #icon>
                <i class="iconfont miconMyInformation"></i>
            </template>
            <span>
                我的
            </span>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
// import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart.js';
import { useTabberStore } from '@/stores/tabber.js';

const { getCountNum } = storeToRefs(useCartStore());
const { loadCart } = useCartStore();
const { active } = storeToRefs(useTabberStore());
const { onChange } = useTabberStore();

export default {
    setup() {
        // const active = ref(0)
        return {
            active,
            getCountNum,
            onChange,
            loadCart
        }
    },
    created() {
        // 1.加载购物车数据
        loadCart();
    },

}
</script>

<style lang="less" scoped>
</style>