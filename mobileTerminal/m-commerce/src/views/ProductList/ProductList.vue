<template>
    <div class="product-list">
        <van-nav-bar title="购物车" left-arrow @click-left="router.back()">
            <template #title>
                <van-search v-model="value" placeholder="全场50元起步" />
            </template>
        </van-nav-bar>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const value = ref(0);
</script>

<style lang="less" scoped>
</style>