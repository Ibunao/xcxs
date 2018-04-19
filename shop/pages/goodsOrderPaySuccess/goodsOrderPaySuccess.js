var app = getApp()

Page({
  data: {
    orderId: '',
    // 获得的积分
    integral: 100
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      'orderId': options.detail,
      'integral':100
    });

  },
  // 返回首页
  goToHomepage: function(){
    var path = "/pages/index/index"
    app.turnToPage(path);
  },
  // 获取订单详情
  goToOrderDetail: function(){
    let that = this;
    let pagePath = '/pages/goodsOrderDetail/goodsOrderDetail?detail=' + that.data.orderId; 
    app.turnToPage(pagePath, true);
  }
})
