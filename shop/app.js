
App({
  onLaunch: function () {
    // 给购物车增加小红标志
    wx.setTabBarBadge({
      index: 1,
      text: '6'
    })
  },
  onShow: function (options) { },
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
  // 跳转页面
  turnToPage: function (url, isRedirect) {
    // 如果是底部导航页
    let tabBarPagePathArr = this.globalData.tabBarPagePathArr;
    console.log('here', tabBarPagePathArr.indexOf(url));
    if (tabBarPagePathArr.indexOf(url) != -1) {
        wx.switchTab({
          url: url
        });
      return;
    }
    // 保留当前页跳转
    if (!isRedirect) {
      wx.navigateTo({
        url: url
      });
      // 不保留当前页跳转
    } else {
      wx.redirectTo({
        url: url
      });
    }
  },
  // 全局数据
  globalData: {
    tabBarPagePathArr: [
      "/pages/my/index",
      "/pages/index/index",
      "/pages/cart/index",
    ],
  },
  // 显示弹窗
  showModal: function (param) {
    wx.showModal({
      title: param.title || '提示',
      content: param.content,
      showCancel: param.showCancel || false,
      cancelText: param.cancelText || '取消',
      cancelColor: param.cancelColor || '#000000',
      confirmText: param.confirmText || '确定',
      confirmColor: param.confirmColor || '#3CC51F',
      success: function (res) {
        if (res.confirm) {
          typeof param.confirm == 'function' && param.confirm(res);
        } else {
          typeof param.cancel == 'function' && param.cancel(res);
        }
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },
})