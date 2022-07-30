<template>
    <div class="address">
        <van-nav-bar title="地址管理" left-arrow @click-left="router.back()">
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>

        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
    </div>
</template>

<script setup>
/**
 * 此处有个问题 我们可以从两个地方进入地址管理界面
 * 1、生成订单界面  /address-edit?type=edit&addressId=336
 * 2、地址管理界面  /address-edit?type=edit&addressId=336
 */


// 引入响应式API
import { ref } from 'vue'

// 引入请提示
import 'vant/es/toast/style';

// 引入请求方法
import { reqAddress } from '@/api/address'

// 引入路由
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
// const route = useRoute();
// console.log(route);

// 单选的按钮标识
const chosenAddressId = ref('1');

// 1.加载地址列表
const list = ref([]);

const loadData = async () => {
    const res = await reqAddress('/address');

    const { data, resultCode } = res.data;

    if (resultCode === 200) {
        dataProcessing(data)
    }
}
loadData()

// 2.数据处理
const dataProcessing = (data) => {
    data.forEach(item => {
        list.value.push({
            id: item.addressId,
            name: item.userName,
            tel: item.userPhone,
            address: `${item.provinceName}${item.cityName}${item.regionName}${item.detailAddress}`,
            isDefault: item.defaultFlag === 1,
            addressId: item.addressId,
            userId: item.userId
        })
    })
}


// 新增地址
const onAdd = () => {
    router.push({
        path: '/addressedit',
        query: {
            type: 'add'
        }
    });
}
// 编辑地址
const onEdit = (address, index) => {
    // console.log(address, index);
    router.push({
        path: '/addressedit',
        query: {
            type: 'edit',
            addressId: address.addressId
        },
    });
}

</script>

<style lang="less" scoped>
</style>