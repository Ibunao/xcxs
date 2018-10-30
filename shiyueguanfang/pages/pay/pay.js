// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    order_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({order_id:options['order_id']})
    // 如果没登陆过进行登陆
    if (!wx.getStorageSync('xcx_openid')) {
      this.login(options['order_id']);
    } else {
      this.openid = wx.getStorageSync('xcx_openid')
      this.payInfo(options['order_id']);
    }
    
  },
  login: function (order_id) {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        if (res.code) {
          //发起网络请求, 获取openid、unionid
          wx.request({
            url: 'https://wxapp.octmami.com/wxapp/index',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res);
              // 存储openid
              if (res.data.code == 200) {
                that.openid = res.data.openid
                wx.setStorageSync('xcx_openid', res.data.openid)
                that.payInfo(order_id);
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  payInfo: function(order_id) {
    var that = this;
    wx.request({
      url: 'https://wxapp.octmami.com/pay/wxapppayInfo',
      data: {
        order_id: order_id,
        openid: that.openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        wx.requestPayment({
          'timeStamp': res.data.other.timeStamp,
          'nonceStr': res.data.other.nonceStr,
          'package': res.data.other.package,
          'signType': 'MD5',
          'paySign': res.data.other.paySign,
          'success': function (res) {
            console.log(res);
            wx.navigateTo({
              url: '/index/index?id=1'
            })
          },
          'fail': function (res) {
            console.log(res);
            // 请求取消支付接口  
            console.log('取消支付')
            wx.request({
              url: 'https://wxapp.octmami.com/groupon/cancelPay',
              data: {
                order_id: order_id,
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log(res)
              }
            })
            wx.navigateTo({
              url: '/index/index?page=/login.html'
            })
          }
        })
      }
    })
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