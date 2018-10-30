// pages/myList/myList.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      imgSwitchIndex: 0,
      items:[
        {
          qishu: '第2018126期',
          riqi: '2018-10-28',
          one: "01",
          two: "02",
          three: "03",
          four: "04",
          five: "05",
          six: "06",
          seven: "07",
          open:false
        },
        {
          qishu: '第2018126期',
          riqi: '2018-10-28',
          one: "01",
          two: "02",
          three: "03",
          four: "04",
          five: "05",
          six: "06",
          seven: "07",
          open:false
        }
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