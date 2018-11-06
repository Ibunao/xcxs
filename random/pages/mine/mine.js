// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    randList: [
    ],
  },
  /**
     * 切换下拉
     */
  xiala: function (e) {
    var switchIndex = e.target.dataset.index
    this.data.randList[switchIndex].open = !this.data.randList[switchIndex].open;
    this.setData({
      randList: this.data.randList
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
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var openid = ''
    var oldList = that.data.randList
    var key = 0
    if (userInfo) {
      openid = userInfo['openid']
    }
    wx.request({
      url: app.globalData.host + 'info/my-list',
      data: {
        openid: openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          for (key in oldList) {
            if(oldList[key].open == true){
              res.data.data[key].open = true
            }
          }
          console.log(res.data.data)
          that.setData({ randList: res.data.data })
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
    that.data.page++
    var userInfo = wx.getStorageSync('userInfo')
    var openid = ''
    var randList = [];
    if (userInfo) {
      openid = userInfo['openid']
    }
    wx.request({
      url: app.globalData.host + 'info/my-list',
      data: {
        openid: openid,
        page: that.data.page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          // 和原来的数据进行拼接  
          randList = that.data.randList.concat(res.data.data)
          that.setData({ randList: randList })
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
  onShareAppMessage: function (res) {
    // 如果是点击分享按钮，带上号码的ID   
    if (res.from == "button") {
      var ballId = res.target.dataset.ballid;
      console.log(res)
      console.log('/pages/index/index?type=m&ballId=' + ballId)
      return {
        title: '兄弟，帮我买这个号',
        path: '/pages/index/index?type=m&ballId=' + ballId,
        imageUrl: "https://www.bunao.win/images/my.jpg"
      }
    }

    return {
      title: '中奖就靠她了',
      path: '/pages/main/main',
      imageUrl: "https://www.bunao.win/images/my.jpg"
    }
  }
})