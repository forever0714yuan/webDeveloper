import http from '../utils/http';
// 登录请求
export const reqLogin = (url, option) => (http.post(url, option));
// 注册请求
export const reqRegistr = (url, option) => (http.post(url, option));
// 获取首页数据
export const reqHome = (url) => (http.get(url));
// 获取商品详情
export const reqProductDetail = (url) => (http.get(url));
// 获取商品列表
export const reqProductList = (url) => (http.get(url));
// 修改商品数量
export const reqProductCount = (url, option) => (http.put(url, option));
// 获取分类数据
export const reqCategory = (url) => (http.get(url));
// 获取用户信息
export const reqUser = (url) => (http.get(url));


