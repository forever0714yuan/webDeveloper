<template>
  <div class="addressedit">
    <van-nav-bar title="修改地址" left-arrow @click-left="router.back()">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>

    <van-address-edit
      :area-list="areaList"
      :show-delete="isshowDelete"
      show-set-default
      :address-info="addresInfo"
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-default="() => value"
    />
  </div>
</template>

<script setup>
// 引入响应式API
import { ref } from 'vue';

// 引入vant
import { Toast } from 'vant';
import 'vant/es/toast/style';
import { Dialog } from 'vant';
import 'vant/es/dialog/style';

// 引入请求方法
import {
  reqAddressDtail,
  reqUploadAddress,
  reqIncreaseAddress,
  reqDeleteAddress,
} from '@/api/address';

// 中国省市区数据
import { areaList } from '@vant/area-data';

// 引入路由
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
// console.log(route.query);
// console.log(route);

// console.log(areaList.county_list);

// 是否显示删除按钮
const isshowDelete = ref(route.query.type === 'edit');

// 获取修改地址的详细信息
const type = ref(route.query.type);
const addressId = ref(route.query.addressId);

const addresInfo = ref({});

// 返回对象中对应值的key
var getObjectKey = (object, value) => {
  return Object.keys(object).find((key) => object[key] == value);
};

const loadData = async () => {
  if (type.value === 'edit') {
    // 获取消息信息
    const res = await reqAddressDtail(`/address/${addressId.value}`);

    const { data, resultCode } = res.data;

    // 设置地址的默认值
    if (resultCode === 200) {
      addresInfo.value = {
        id: data.addressId,
        name: data.userName,
        tel: data.userPhone,
        province: data.provinceName,
        city: data.cityName,
        county: data.regionName,
        areaCode: getObjectKey(areaList.county_list, data.regionName),
        addressDetail: data.detailAddress,
        isDefault: data.defaultFlag === 1,
        userId: data.userId,
      };
    }
  }
};
loadData();

// 修改或者添加的按钮
const onSave = async (content) => {
  console.log(content);
  const options = {
    cityName: content.city,
    defaultFlag: content.isDefault === false ? 0 : 1,
    detailAddress: content.addressDetail,
    provinceName: content.province,
    regionName: content.county,
    userName: content.name,
    userPhone: content.tel,
  };
  if (type.value === 'edit') {
    // 修改
    const res = await reqUploadAddress('/address', {
      addressId: addressId.value,
      userId: content.userId,
      ...options,
    });
    const { resultCode } = res.data;
    if (resultCode === 200) {
      Toast.success('保存成功');
      router.push('/address');
    }
  } else {
    //新增
    const res = await reqIncreaseAddress('/address', options);
    const { resultCode } = res.data;
    if (resultCode === 200) {
      Toast.success('保存成功');
      router.push('/address');
    }
  }
};
// 删除操作
const onDelete = (content) => {
  console.log(content);
  Dialog.confirm({
    message: '您确认要删除吗？',
  })
    .then(async () => {
      const res = await reqDeleteAddress(`/address/${content.id}`);
      const { resultCode } = res.data;
      if (resultCode === 200) {
        Toast.success('删除成功');
        router.push('/address');
      }
    })
    .catch((error) => {
      if (error == 'cancel') {
        Toast('取消成功');
      }
    });
  //
};
</script>

<style lang="less" scoped></style>
