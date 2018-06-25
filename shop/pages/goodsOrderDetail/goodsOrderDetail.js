var app = getApp();
// pages/goodsOrderDetail/goodsOrderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    title:'',
    goodsList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var type = options.type
    var title = ''
    if(type == 'daifa'){
      title = '待发货'
    } else if (type == 'daishou'){
      title = '待收货'
    } else if (type == 'daiping') {
      title = '待评价'
    } else if (type == 'daifu') {
      title = '待支付'
    }else{
      title ='我的订单'
    }

    that.setData({
      'type': options.type,
      title: title
    });
    // 设置导航条
    wx.setNavigationBarTitle({
      title: title,
    })
    this.init(type)
  },
  init:function(type){
    var that = this
    wx.request({
      url: app.globalData.host +'/order/daiinfo',
      data: {
        type:type,
        openid: app.globalData.openid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({goodsList:res.data.other})
        if(!that.goodsList){
          wx.showToast({
            title: '没有数据',
            icon: 'success',
            duration: 4000
          })
        }
      }
    })
  }
})