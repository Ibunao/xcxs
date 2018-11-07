var app = getApp()
// pages/myList/myList.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      page:0,
      imgSwitchIndex: 0,
      items:[
      ]
  },
  /**
   * 切换下拉
   */
  xiala: function (e) {
    var switchIndex = e.target.dataset.index
    this.data.items[switchIndex].open = !this.data.items[switchIndex].open;
    this.setData({
        imgSwitchIndex: switchIndex,
        items: this.data.items
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.host + 'info/history-list',
      data: {
        page: 0,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          
          that.setData({ items: res.data.data })
        }
      },
      fail() {
        wx.showToast({
          title: '发生错误，请联系客服',
          icon: 'none',
          duration: 2000
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
    var that = this
    var items = []
    that.data.page++
    wx.request({
      url: app.globalData.host + 'info/history-list',
      data: {
        page: that.data.page,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          // 和原来的数据进行拼接  
          items = that.data.items.concat(res.data.data)
          that.setData({ items: items })
        }
      },
      fail() {
        wx.showToast({
          title: '发生错误，请联系客服',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})