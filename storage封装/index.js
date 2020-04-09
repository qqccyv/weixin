const data = {
  name: 'dengyu',
  age: 30
}

//利用本地存储的原型对象方法和this指向封装$set方法,localStorage和sessionStorage哪个对象调用了，
//this就指向谁
Storage.prototype.$set = function (key, data) {
  this[key] = JSON.stringify(data)
}
//参数不能单独设置为default，为关键字
Storage.prototype.$get = function (key, defaultValue = {}) {
  const data = this[key]
  let result
  //利用try-catch方法处理JSON字符串失败的情况
  try {
    result = data ? JSON.parse(data) : defaultValue
  } catch (error) {
    result = data
  }
  return result
}


// localStorage.$set('userInfo',data)
// sessionStorage.$set('userInfo',data)
const newData = localStorage.$get('userInfo')
console.log(newData);
