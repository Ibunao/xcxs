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
      title = '已完成'
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
        var data = res.data.other;
        for (var i = 0; i < data.length; i++) {
          data[i].button = data[i].status == 2 && data[i].ship_status == 0 ? '催单' : (data[i].status == 2 && data[i].ship_status == 1 ? '确认收货' : (data[i].status == 2 && data[i].ship_status == 2 ? '申请退货' : (data[i].status == 2 && data[i].ship_status == 3 ? '审核中' : '已完成')))
        }
        that.setData({goodsList:res.data.other})
        if (!res.data.other.length){
          wx.showToast({
            title: '没有数据',
            icon: 'success',
            duration: 4000
          })
        }
      }
    })
  },
  dai_button:function(e){
    console.log(e.target.dataset);
    var data = e.target.dataset;
    var title='';
    if(data.ship == 0 && data.status == 2){
      title = '催单成功'
    }
    if (data.ship != 0){
      title = '确认成功'
      wx.request({
        url: app.globalData.host + '/order/daibutton',
        data:data,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
         console.log(res);
        }
      })
    }
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 2000
    })
  }
})