// pages/groupbuyingfiles/groupbuyingnext/groupbuyingnext.js
var app = getApp();
var utils = require('../../../utils/groupbuytools.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    bannerHeight: wx.getSystemInfoSync().windowWidth / 2.66,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getData();
  },



  getData: function () {
    var that = this;
    utils.octRequestWithUrl(app.globalData.groupon_next, "", function (res) {
      var banners = res.banners;
      var itemList = res.list;
      that.selectComponent("#custom").setList(itemList);
      that.setData({
        banners: banners
      })
    }, function (msg) {

    })
  },

  //广告点击事件
  bannersClick: function (e) {
    console.log(e.currentTarget.dataset.data.img);
  },


  //点击item绑定的方法
  detailData: function (e) {
    var item = e.detail;
    console.log(item);
    // wx.navigateTo({
    //   url: '../mainpage/detailview/detailview?getTypeString=' + "str"
    // })
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