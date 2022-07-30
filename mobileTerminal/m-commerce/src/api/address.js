import http from '../utils/http';

/**地址管理 */
// 获取我的收货地址列表
export const reqAddress = (url) => (http.get(url));
// 添加收货地址
export const reqIncreaseAddress = (url, options) => (http.post(url, options));
// 修改地址
export const reqUploadAddress = (url, options) => (http.put(url, options));
// 删除收货地址
export const reqDeleteAddress = (url) => (http.delete(url));
// 获取默认收货地址
export const reqDefaultAddress = (url) => (http.get(url));
// 获取收获地址详情
export const reqAddressDtail = (url) => (http.get(url));
