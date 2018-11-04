// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    randList: [
      {
        date: "2018-12-32",
        qishu: "20180930",
        jieguo: "未开奖",
        items: [
          {
            img: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoHZkDvnuY17Rksiatk1AX5htF7wZYAibcPyib1cibd7wLO2GYthwTsADIibzjia19Ou77oddS40UvLukYg/132',
            name: "1**0",
            borderStyle: 1,
            balls: [
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
            ],
            result: "",
            open: false
          },
          {
            img: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoHZkDvnuY17Rksiatk1AX5htF7wZYAibcPyib1cibd7wLO2GYthwTsADIibzjia19Ou77oddS40UvLukYg/132',
            name: "100-20",
            borderStyle: 2,
            balls: [
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
            ],
            result: "",
            open: false,
          }
        ]
      },
      {
        date: "2018-12-32",
        qishu: "20180930",
        jieguo: "未开奖",
        items: [
          {
            img: '',
            name: "100-20",
            balls: [
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
            ],
            result: "中10000元",
            open: false
          }
        ]
      }
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
  onShareAppMessage: function (res) {
    // 如果是点击分享按钮，带上号码的ID   
    if (res.from == "button") {
      var ballId = res.target.ballId;
      return {
        title: '兄弟，帮我买这个号',
        path: '/pages/index?type=m&ballId=' + ballId,
        imageUrl: "https://www.bunao.win/images/my.jpg"
      }
    }

    return {
      title: '自定义转发标题',
      path: '/pages/main?id=123',
      imageUrl: "https://www.bunao.win/images/my.jpg"
    }
  }
})