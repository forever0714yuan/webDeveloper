import { defineStore } from 'pinia'
import { reqProductList } from '../api/index'

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cart: []
  }),
  getters: {
  },
  actions: {
    // 添加到购物车
    addCart(product) {
      console.log(product);
      // 判断购物车中 是否有当前商品
    },
    // 获取数据
    async loadCart() {
      const res = await reqProductList('shop-cart')
      console.log(res);
    }
  }
})
