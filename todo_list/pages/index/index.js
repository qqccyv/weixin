Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskList: [],
    unCompletedTask: []
  },
// 获取任务列表，并渲染
getTaskList(){
  this.setData({
    taskList: wx.getStorageSync("taskList")? wx.getStorageSync("taskList"):[],
  })
  let {taskList} = this.data

  this.setData({
    unCompletedTask: taskList.filter(item=>!item.completed)
  })
},
// 完成任务
accomplish({currentTarget:{dataset:{id}}}){
  // console.log(id);
  let {taskList} = this.data
  taskList.find(item=>item.id===id).completed = true
wx.setStorageSync('taskList', taskList)
  this.getTaskList()
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getTaskList()
    // console.log(this.data.taskList);
    
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