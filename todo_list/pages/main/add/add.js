// pages/main/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskValue:'',
    remarkValue: ''
  },
  // 同步页面任务信息和备注信息
  taskInput({detail: {value}}){
    // console.log(e);
    this.setData({
      taskValue: value
    })
    // console.log(this.data.taskValue);
    
  },
  remarkInput({detail: {value}}){
    this.setData({
      remarkValue: value
    })
  },
  // 添加任务信息
  add(){
    const {taskValue,remarkValue} = this.data
   var taskList = wx.getStorageSync("taskList")? wx.getStorageSync("taskList"):[]
  //  console.log(taskList);
  taskList.unshift({
    id: taskList[0]? taskList[0].id+1:0,
    taskValue: taskValue,
    remarkValue: remarkValue,
    createTime:  new Date().toString(),
    completed: false
  })
  wx.setStorage({//存储到本地
    key:"taskList",
    data:taskList
  })  
   this.setData({
    taskValue:'',
    remarkValue: ''
   })
    // wx.setStorageSync("taskList", value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})