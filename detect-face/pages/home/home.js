const app = getApp()
import {
  queryString
} from '../../utils/util'
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wh: '',
    //是否是前置镜头
    isFont: false,
    //最新照片地址
    url: '',
    //检测结果
    faceInfo: null,
    mapper: {
      exp: {
        none: '不笑',
        smile: '微笑',
        laugh: '大笑'
      },
      sex: {
        male: '男',
        female: '女'
      },
      gla: {
        none: '无眼镜',
        common: '普通眼镜',
        sun: '墨镜'
      },
      emo: {
        angry: '愤怒',
        disgust: '厌恶',
        fear: '恐惧',
        happy: '高兴',
        sad: '伤心',
        surprise: '惊讶',
        neutral: '无表情',
        pouty: '撅嘴',
        grimace: '鬼脸'
      }
    }
  },

  //切换镜头
  changeShot() {
    this.setData({
      isFont: !this.data.isFont
    })
  },

  //拍照功能
  takeAPhotoshop() {
    const CameraContext = wx.createCameraContext()
    CameraContext.takePhoto({
      quality: 'normal',
      success: (res) => {
        this.setData({
          url: res.tempImagePath
        }, () => {
          this.detect()
        })
      },
      fail: () => {
        wx.showToast({
          title: '相机抽风！',
          icon: 'none'
        });
        this.setData({
          url: ''
        })
      }
    })
  },

  //选择照片
  choosePic() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: (res) => {
        console.log(res);

        this.setData({
          url: res.tempFilePaths[0]
        }, () => {
          this.detect()
        })
      },
      fail: () => {
        wx.showToast({
          title: '没有选择照片',
          icon: 'none'
        });
        this.setData({
          url: ''
        })
      }
    })
  },

  //重选照片
  reChoose() {
    this.setData({
      url: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      windowHeight
    } = wx.getSystemInfoSync()
    this.setData({
      wh: windowHeight
    })
    // console.log(this.data.wh);

  },

  //测试颜值功能
  detect() {
    const token = app.store.token
    const fs = wx.getFileSystemManager()
    const base64 = fs.readFileSync(this.data.url, 'base64')
    wx.showLoading({
      title: '人脸检测中..',
    });
    if (token) {
      // console.log(token);
      wx: wx.request({
        url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect' + queryString({
          access_token: token
        }),
        complete: (res) => {
          wx.hideLoading();
        },
        data: {
          image: base64,
          image_type: 'BASE64',
          face_field: 'age,beauty,expression,gender,glasses,emotion'
        },
        fail: (res) => {
          wx.showToast({
            title: '测试失败',
            icon: 'none'
          });
        },
        header: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        success: (res) => {
          const {
            result
          } = res.data;

          // 判断检测到人脸数据了吗。
          if (result) {
            this.setData({
              faceInfo: result.face_list[0]
            });
          } else wx.showToast({
            title: '没有检测到人脸！',
            icon: 'none'
          })

        },
      })

    }
    else {
      wx: showToast({
        title: '获取鉴权失败',
        icon: 'none'
      })
    }
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