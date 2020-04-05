import wepy from 'wepy'

const BASE_URL = 'https://www.zhengzhicheng.cn/api/public/v1'

wepy.$toast = (message='获取数据失败！',isIcon=false)=> wepy.showToast({
  title: message,
  icon: isIcon? 'succes': 'none',
  duration: 1500
})

/**
 * 
 * @param {String} url 访问路径
 * @param {Object} data 访问携带的参数
 * @param {Boolean} isPOST 是否是post请求
 * @returns {Promise} 
 */
const request = (url, data = {}, isPOST = false) => wepy.request({
  url: BASE_URL + url,
  data,
  method: isPOST ? 'POST' : 'GET'
})


/**
 * 发起一个 GET 请求。
 * @param {String} url 访问路径。
 * @param {Object} data 数据。
 * @returns {Promise} 请求后的 Promise 对象。
 */
wepy.get = (url, data) => request(url, data)

/**
 * 发起一个 POST 请求。
 * @param {String} url 访问路径。
 * @param {Object} data 数据。
 * @returns {Promise} 请求后的 Promise 对象。
 */
wepy.post = (url, data) => request(url, data, isPOST = true)