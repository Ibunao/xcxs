//app.js
// 引入阿拉丁统计
const ald = require('./utils/ald-stat.js')

App({
  onLaunch: function () {
  },
  globalData: {
    host: "http://api.random.com/",
    userInfo: null
  }
})