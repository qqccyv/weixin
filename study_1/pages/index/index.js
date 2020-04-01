Page({

  /**
   * 页面的初始数据
   */
  data: {
    iptValue: '输入点什么吧',
    height: 180,
    list: [{id:1,name:'zs'}],
    list2: new Array(300).fill(1),
    arr: [1,2,3,4,5,6,7,8,9,10],
    page: 1
  },
  // iptHandler({detail: {value}}){
  //   this.setData({
  //     iptValue: value
  //   })
    
  // },
  iptHandler({detail:{value},currentTarget}){
  //  console.log(e);
    const name = currentTarget.dataset.name
    this.setData({
      [name] : value
    })
  },
  btn(e){
    console.log(e.target.dataset.info);
    
  },
  add(){
    const{list:[...list],height} = this.data
    this.setData({
      list: [{id:list.length,name:height},...list]
    })
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
    // console.log("我刷新了");
    this.setData({
      height: 150
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const {arr,page} = this.data
    let newArr = new Array(10).fill().map((item,i)=>{return item=page*10 + i +1})
    this.setData({
      arr: arr.concat(...newArr),
      page: page+1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})