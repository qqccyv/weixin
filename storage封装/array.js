const arr = [{isChecked: true,count: 2,price: 2},{isChecked: false,count: 2,price: 2},{isChecked: true,count: 2,price: 2}]
let newArr = arr.filter((item)=>item.isChecked).map(item=>item.count*item.price).reduce((prev,curr)=>prev+curr,0)
console.log(newArr);
