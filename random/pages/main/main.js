// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
    seven: "",
    create: false,
  },
  liebiao: function(e) {
    wx.navigateTo({
      url: '/pages/myList/myList'
    })
  },
  shuoming: function() {
    wx.navigateTo({
      url: '/pages/shuoming/shuoming'
    })
  },
  bindKeyInput: function(e) {
    var inputValue = e.detail.value;
    var key = e.target.dataset.index;
    var generate = this.data.generate;
    generate[key] = inputValue;
    generate.three = 30;
    this.setData({generage: generate})
  },
  generate: function(e) {
    var that = this;
    // 随机打乱数组
    function randomsort(a, b) {
      return Math.random() > .5 ? -1 : 1;
    }
    var red = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18",
    "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33"];
    var blue = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
    var temp = setTimeout(function(){
      red.sort(randomsort);
      blue.sort(randomsort)
      that.setData({one:red[1]})
      that.setData({ two: red[2] })
      that.setData({ three: red[3] })
      that.setData({ four: red[4] })
      that.setData({ five: red[5] })
      that.setData({ six: red[6] })
      that.setData({ seven: blue[1] })
    }, 30)
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