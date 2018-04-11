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

  },

})
