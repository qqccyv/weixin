// components/test/test.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propCount: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: 0
  },
  observers: {
    "value": function(newValue){
      console.log(newValue);
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    btnhandler(){
      this.setData({
        value: this.data.value +1
      })
    }
  }
})
