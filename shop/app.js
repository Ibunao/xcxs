
App({
  onLaunch: function () {},
  onShow: function (options) {},
  // 首页搜索框search事件
  searchList: function (event) {
    // 获取当前页对象
    let pageInstance = this.getAppCurrentPage();
    let that = this;
    // 搜索
    let url = 'https://api.quutuu.com/appData/search';
    let param = { "abc": "abc", "form": "form" };
    wx.request({
      url: url,
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
          var newdata = {};
          // 将来改成跳转
          pageInstance.setData(newdata);
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function () {
      }
    })
  },
  getAppCurrentPage: function () {
    let pages = getCurrentPages();
    return pages[pages.length - 1];
  },
})