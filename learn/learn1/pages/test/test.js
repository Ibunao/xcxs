//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name: 'World',
  },
  changeName: function(){
    this.setData({name : 'WeChat'})
  },
  onLoad: function () {

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    wx.setTabBarBadge({
      index: 0,
      text: '1'
    })
  },

})
