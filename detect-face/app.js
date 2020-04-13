import {queryString} from './utils/util'
App({

  store: {
    token: ''
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    this.getToken()
  },
//获取鉴权token
  getToken(){
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token'+queryString({
        grant_type: 'client_credentials',
        client_id: 'F6MzDWvhcDor5eIFFe2pGzD9',
        client_secret: 'wzTmWRwKaDbxpWiUXdy6BGEEqWCEs9oE '
      }),
      method: 'POST',
      success: (res)=>{
        // console.log(res);
        this.store.token = res.data.access_token
        // console.log(this);
        
      },
      fail: ()=>{
        wx.showToast({
          title: '获取鉴权失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
