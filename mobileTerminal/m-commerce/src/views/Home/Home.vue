<template>
  <div class="home">
    <header class="header">
      <div class="more">
        <router-link to="/category">
          <i class="iconfont miconenabled menu "></i>
        </router-link>
      </div>

      <div class="search">
        <i class="iconfont miconjingdong jd"></i>
        <i class="iconfont miconsearch1 search-icon"></i>

        <div class="search-input">
          <span>小天鹅洗衣机</span>
        </div>
      </div>

      <div class="user">
        <router-link to="/user">
          <i class="iconfont miconaccount menu"></i>
        </router-link>
      </div>
    </header>
    <section class="main">
      <div class="slider-bg"></div>
      <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <a href="https://item.m.jd.com/product/67126015771.html">
            <img src="https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner1.png">
          </a>
        </van-swipe-item>
        <van-swipe-item>
          <a href="https://item.m.jd.com/product/67126015771.html">
            <img src="https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner2.png">
          </a>
        </van-swipe-item>
      </van-swipe>
      <div class="category-list">
        <a href="#">
          <img src="/src/assets/images/jd/01.png" alt="">
          <span>京东超市</span>
        </a>

        <a href="#">
          <img src="/src/assets/images/jd/02.png" alt="">
          <span>数码电器</span>
        </a>

        <a href="#">
          <img src="/src/assets/images/jd/03.png" alt="">
          <span>京东服饰</span>
        </a>

        <a href="#">
          <img src="/src/assets/images/jd/04.png" alt="">
          <span>京东生鲜</span>
        </a>

        <a href="#">
          <img src="/src/assets/images/jd/05.png" alt="">
          <span>京东到家</span>
        </a>

        <a href="#">
          <img src="/src/assets/images/jd/06.png" alt="">
          <span>充值缴费</span>
        </a>

        <a href="#">
          <img src="/src/assets/images/jd/07.png" alt="">
          <span>9.9元拼</span>
        </a>

        <a href="#">
          <img src="/src/assets/images/jd/08.png" alt="">
          <span>领券</span>
        </a>

        <a href="#">
          <img src="/src/assets/images/jd/09.png" alt="">
          <span>领金贴</span>
        </a>

        <a href="#">
          <img src="/src/assets/images/jd/10.png" alt="">
          <span>PLUS会员</span>
        </a>

      </div>
      <div class="good">
        <header class="good-header">新品上线</header>
        <div class="good-box">
          <div class="good-item" @click="handleTo(hot)" v-for="hot in hotGoods" :key="hot.goodsId">
            <img :src="'http://localhost:28019/' + hot.goodsCoverImg">
            <div class="good-des">
              <div class="title">{{ hot.goodsName }}</div>
              <div class="price">¥ {{ hot.sellingPrice }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="good">
        <header class="good-header">最新推荐</header>
        <div class="good-box">
          <div class="good-item" v-for="newGood in newGoods" :key="newGood.goodsId">
            <img :src="'http://localhost:28019' + newGood.goodsCoverImg">
            <div class="good-des">
              <div class="title">{{ newGood.goodsName }}</div>
              <div class="price">¥ {{ newGood.sellingPrice }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="good">
        <header class="good-header">推荐商品</header>
        <div class="good-box">
          <div class="good-item" v-for="recommend in recommendGoods" :key="recommend.goodsId">
            <img :src="'http://localhost:28019' + recommend.goodsCoverImg">
            <div class="good-des">
              <div class="title">{{ recommend.goodsName }}</div>
              <div class="price">¥ {{ recommend.sellingPrice }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">
        <template #icon>
          <i class="iconfont miconxuanzhongshangcheng"></i>
        </template>
        <span>
          <router-link to="/">首页</router-link>
        </span>
      </van-tabbar-item>
      <van-tabbar-item icon="search">
        <template #icon>
          <i class="iconfont miconsort"></i>
        </template>
        <span>
          <router-link to="/category">分类</router-link>
        </span>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" badge="0">
        <template #icon>
          <i class="iconfont miconFontAwesomecartarrowdown"></i>
        </template>
        <span>
          <router-link to="/cart">购物车</router-link>
        </span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o">
        <template #icon>
          <i class="iconfont miconMyInformation"></i>
        </template>
        <span>
          <router-link to="/user">我的</router-link>
        </span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { reqHome } from '@/api';
const router = useRouter()
// 滑块的图片
const images = ref([]);
const active = ref(0);
// 新品上线
const hotGoods = ref([]);
// 最新推荐
const newGoods = ref([]);
// 推荐商品
const recommendGoods = ref([]);

// 加载数据
const loadData = async () => {
  const res = await reqHome('index-infos');
  console.log(res);
  const { data: { carousels, hotGoodses, newGoodses, recommendGoodses }, resultCode } = res.data;
  if (resultCode === 200) {
    images.value = carousels;
    hotGoods.value = hotGoodses;
    newGoods.value = newGoodses;
    recommendGoods.value = recommendGoodses;
  }
}
loadData();

// 跳转
const handleTo = (hot) => {
  console.log(hot.goodsId);
  router.push(`/product/${hot.goodsId}`)
}

</script>

<style lang="less" scoped>
.home {
  position: relative;
  width: 375px;

  .header {
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    height: 50px;
    line-height: 50px;
    padding: 0 15PX;
    background-color: transparent;

    .more {
      width: 22PX;
      height: 50PX;
    }

    .user {
      width: 22PX;
      height: 50PX;
    }

    .search {
      display: flex;
      align-items: center;
      flex: 1;
      margin: 10PX 15PX;
      background-color: #fff;
      border-radius: 15px;
      position: relative;

      .jd {
        width: 50px;
        height: 50px;
        text-align: center;
        color: #e73d43;

        &::after {
          content: '';
          height: 16px;
          border-right: 1px solid #ddd;
          position: absolute;
          left: 45px;
          top: 7px;
        }
      }

      .search-icon {
        margin-left: 9px;
        color: #999;
      }

      .search-input {
        margin-left: 15px;
        color: #999;
        font-size: 12px;
      }
    }


  }

  .main {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    .slider-bg {
      position: absolute;
      width: 100%;
      height: 144px;
      background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
      border-bottom-left-radius: 100%;
      border-bottom-right-radius: 100%;
    }

    .swiper {
      position: relative;
      margin: 50px 18.75px 0;
      width: 337.5px;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 337.5px;
        height: 140px;
      }
    }

    .category-list {
      display: flex;
      flex-wrap: wrap;


      a {
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        margin: 8px 0;


        img {
          width: 40px;
          height: 40px;
        }

        span {
          font-size: 12px;
          color: #666;
        }
      }

    }

    .good {

      .good-header {
        text-align: center;
        background-color: #f9f9f9;
        color: #f11440;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 500;
      }

      .good-box {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;

        .good-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          padding: 10px;
          border-bottom: 1PX solid #e9e9e9;

          &:nth-child(2n+1) {
            border-right: 1PX solid #e9e9e9;
          }

          img {
            width: 120px;
            height: 120px;
          }

          .good-des {
            padding: 10px 0;
            width: 166px;
            height: 74px;
            font-size: 14px;
            text-align: center;

            .title {
              color: #666;
            }

            .price {
              color: #c62722;
            }
          }
        }
      }
    }
  }
}



.menu {
  font-size: 22px;
}
</style>