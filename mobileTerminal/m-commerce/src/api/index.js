import http from '../utils/http';
// 登录请求
export const reqLogin = (url, options) => (http.post(url, options));
// 注册请求
export const reqRegistr = (url, options) => (http.post(url, options));
// 获取首页数据
export const reqHome = (url) => (http.get(url));
// 获取商品详情
export const reqProductDetail = (url) => (http.get(url));
// 修改商品数量
export const reqProductCount = (url, options) => (http.put(url, options));
// 获取分类数据
export const reqCategory = (url) => (http.get(url));
// 获取用户信息
export const reqUser = (url) => (http.get(url));

/**购物车接口 */
// 获取购物车列表
export const reqCartList = (url) => (http.get(url));
// 添加商品到购物车
export const reqAddCart = (url, options) => (http.post(url, options));
// 修改购物项数据
export const reqUploadCart = (url, options) => (http.put(url, options));
// 删除购物车列表项
export const reqDeleteCart = (url) => (http.delete(url));

/**订单列表接口 */
// 获取订单列表
export const reqOrder = (url) => (http.get(url));




