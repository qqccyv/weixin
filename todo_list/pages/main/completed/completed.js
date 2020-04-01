// pages/main/completed/completed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskList: [],
    completedTask: []
  },
  // 获取任务列表，并渲染
getTaskList(){
  this.setData({
    taskList: wx.getStorageSync("taskList")? wx.getStorageSync("taskList"):[]
  })
  let {taskList} = this.data

  this.setData({
    completedTask: taskList.filter(item=>item.completed)
  })
},
// 未完成任务
unAccomplish({currentTarget:{dataset:{id}}}){
  // console.log(id);
  let {taskList} = this.data
  taskList.find(item=>item.id===id).completed = false
  wx.setStorageSync('taskList', taskList)
  this.getTaskList()
  
},
// 删除任务
deletedTask({currentTarget:{dataset:{id}}}){
  let {taskList} = this.data
 taskList =  taskList.filter(item=>item.id!==id)
 wx.setStorageSync('taskList', taskList)
  this.getTaskList()
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
    this.getTaskList()
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