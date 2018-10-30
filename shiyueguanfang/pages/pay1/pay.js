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
    console.log(options.params)
    var params = decodeURIComponent(options.params)
    console.log(params)
    params = JSON.parse(params)
    console.log(params)
    wx.requestPayment({
      'timeStamp': params.timeStamp,
      'nonceStr': params.nonceStr,
      'package': params.package,
      'signType': 'MD5',
      'paySign': params.paySign,
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
        wx.navigateTo({
          url: '/index/index?page=/login.html'
        })
      }
    })
  },
  payInfo: function(order_id) {

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