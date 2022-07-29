<template>
  <div class="category">
    <van-nav-bar title="购物车" left-arrow @click-left="router.back()">
      <template #title>
        <van-search v-model="value" placeholder="全场50元起步" />
      </template>
    </van-nav-bar>

    <van-tree-select v-model:main-active-index="activeIndex" height="100%" :items="items">
      <template #content>
        <div v-if="items[activeIndex]" style="margin-bottom: 50px;">

          <div v-for="item in items[activeIndex].secondLevelCategoryVOS" :key="item.categoryId">
            <h3 class="category-title">
              {{ item.categoryName }}
            </h3>
            <!-- grid -->
            <van-grid :column-num="3" :border="false">
              <!-- icon="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" -->
              <van-grid-item @click="handleSubItem(subItem.categoryId)" v-for="subItem in item.thirdLevelCategoryVOS"
                :key="subItem.categoryId" icon="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png"
                :text="subItem.categoryName" />
            </van-grid>
          </div>

        </div>
      </template>
    </van-tree-select>

    <Tabber></Tabber>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { reqCategory } from '@/api';
import Tabber from '@/components/Tabber.vue';

const router = useRouter();
//
const items = ref([]);
const activeIndex = ref(0);
const value = ref('')

// 1.获取数据
const loadData = async () => {
  const res = await reqCategory('/categories');
  // console.log(res);
  const { data, resultCode } = res.data;
  if (resultCode === 200) {
    items.value = data;
    trimData(items);
  }
}

loadData();


// 整理数据
const trimData = (data) => {
  data.value.map((currentValue, index, arr) => {
    if (currentValue.categoryLevel === 1) {
      currentValue.text = currentValue.categoryName;
    }
    return currentValue
  })
}
console.log(router);

const handleSubItem = (id) => {
  console.log(id);
  router.push({
    path: '/productlist',
    query: {
      categoryId: id
    }
  })
}
</script>

<style lang="less" >
html,
body,
#app {
  height: 100%;
}



.category-title {
  margin-left: 10px;
}

.category {
  height: 100%;
  background-color: #fff;
}

/* 主题色 */
:root {
  --van-primary-color: #c82a24;
}

.van-search__content {
  background-color: #fff;
}

.van-search {
  height: 46px;
  text-align: center;
}
</style>