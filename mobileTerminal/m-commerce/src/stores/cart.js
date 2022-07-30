import { defineStore } from 'pinia'
import { reqCartList, reqProductCount, reqAddCart, reqUploadCart, reqDeleteCart } from '../api/index'
import { getStore } from '../utils/storage';
import { Toast } from 'vant';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cart: [],
    checked: [],
    newArr: []
  }),
  getters: {
    // 获取选中的价格
    getCountPrice() {
      this.newArr = this.cart.filter(item => this.checked.includes(item.cartItemId));
      return this.newArr.reduce((checkPrice, item) => (checkPrice += item.goodsCount * item.sellingPrice), 0);
    },
    // 获取数量
    getCountNum() {
      return this.cart?.length;
    }
  },
  actions: {
    // 添加到购物车
    addCart(product) {
      console.log(product);
      // 判断购物车中 是否有当前商品
      const cartPro = this.cart.find(p => p.goodsId === product.goodsId);

      if (cartPro) {
        // 有记录 增加数量
        console.log(cartPro);
        if (cartPro.goodsCount > 5) {
          return Toast.fail('添加数量不能大于5个哦');
        }

        reqUploadCart('/shop-cart', {
          cartItemId: cartPro.cartItemId,
          goodsCount: cartPro.goodsCount++
        })
      } else {
        // 没有记录  添加
        reqAddCart('/shop-cart', {
          goodsCount: 1,
          goodsId: product.goodsId
        })
      }
    },
    // 获取数据
    async loadCart() {
      const res = await reqCartList('/shop-cart')
      // console.log(res);
      this.cart = res.data.data
    },
    // 修改数量
    async handleChange(value, details) {
      const token = getStore('token');

      if (!token) {
        Toast.fail('请先登录！');
        router.push('/login');
        return;
      }

      // 发送请求
      const res = await reqProductCount('/shop-cart', {
        cartItemId: details.name,
        goodsCount: value
      })
      // console.log(res);
      // const { message, resultCode } = res.data;
      // if (resultCode === 500) {
      //   Toast.fail(message);
      //   this.loadCart()
      // }
    },
    // 删除购物车列表项
    async handleDelete(gooddItem) {
      // console.log(gooddItem);
      const res = await reqDeleteCart(`/shop-cart/${gooddItem.goodsId}`);
      console.log(res);
      const { resultCode } = res.data;
      if (resultCode === 200) {
        Toast.success('删除成功')
      }
    }
  }
})
