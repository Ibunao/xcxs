//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    inputValue:'',//搜索内容
    userInfo: {},
    hasUserInfo: false,
    "search": {},
    carousel: {
      "type": "carousel",
      "style": "height:372.65625rpx;margin-left:0;margin-right:auto;margin-top:7.03125rpx;opacity:1;",
      content: [
        // {
        //   "pic": "http://img.weiye.me/zcimgdir/album/file_5966e5a206bec.png",
        //   eventParams:1,
        //   eventHandler: 'carouselHandler'
        // },
        // {
        //   "pic": "http://img.weiye.me/zcimgdir/album/file_5966e5a206bec.png",
        //   eventParams:2,
        //   eventHandler:'carouselHandler'
        // }
      ],
      "customFeature": {
        "autoplay": true,
        "interval": "2.7",
      },
    },
    "titles": [
      {
        "title": "为你推荐",
        "content": "Recommend to you"
      },
      {
        "title": "分类",
        "content": "Classified Catalogue"
      },
      {
        "title": "精选",
        "content": "choiceness to you"
      }
    ],
    "classify":[
      // {
      //   name:"徒步露营",
      //   url:""
      // },
      // {
      //   name:"测试测试",
      //   url:""
      // },
      // {
      //   name: "测试测试",
      //   url: ""
      // },
      // {
      //   name: "测试测试",
      //   url: ""
      // }
    ],
    "groups": {
      "style": "width:750rpx;height:510.9375rpx;margin-bottom:auto;margin-right:auto;margin-top:16.40625rpx;opacity:1;margin-left:auto;",
      "content": [
        {
          "style": "opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-radius:7.03125rpx;border-style:none;height:178.125rpx;width:342.1875rpx;margin-left:0;margin-right:0;margin-top:0;position:absolute;left:18.75rpx;",
          "content": "",
          "textStyle": "background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(53, 53, 53);font-size:30.46875rpx;height:44.53125rpx;width:337.5rpx;line-height:44.53125rpx;margin-left:0;margin-top:0;opacity:1;text-align:center;position:absolute;left:21.09375rpx;top:187.5rpx;margin-right:0;",
          "textContent": "",
          "group":'',
          "itemIndex": 0,
          "eventHandler": "tapInnerLinkHandler"
        },
        {
          "style": "opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-radius:7.03125rpx;border-style:none;height:178.125rpx;width:342.1875rpx;margin-left:0;margin-right:0;margin-top:0;position:absolute;left:386.71875rpx;",
          "content": "",
          "textStyle": "background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(53, 53, 53);font-size:30.46875rpx;height:44.53125rpx;width:323.4375rpx;line-height:44.53125rpx;margin-left:0;margin-top:0;opacity:1;text-align:center;position:absolute;left:396.09375rpx;top:189.84375rpx;margin-right:0;",
          "textContent": "",
          "group": '',
          "itemIndex": 1,
          "eventHandler": "tapInnerLinkHandler"
        },
        {
          "style": "opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-radius:7.03125rpx;border-style:none;height:178.125rpx;width:342.1875rpx;margin-left:0;margin-right:0;margin-top:0;position:absolute;left:21.09375rpx;top:253.125rpx;",
          "content": "",
          "textStyle": "background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(53, 53, 53);font-size:30.46875rpx;height:44.53125rpx;width:330.46875rpx;line-height:44.53125rpx;margin-left:0;margin-top:0;opacity:1;text-align:center;position:absolute;left:28.125rpx;top:445.3125rpx;margin-right:0;",
          "textContent": "",
          "group": '',
          "itemIndex": 2,
          "eventHandler": "tapInnerLinkHandler"
        },
        {
          "style": "opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-radius:7.03125rpx;border-style:none;height:178.125rpx;width:342.1875rpx;margin-left:0;margin-right:0;margin-top:0;position:absolute;left:389.0625rpx;top:253.125rpx;",
          "content": "",
          "textStyle": "background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(53, 53, 53);font-size:30.46875rpx;height:44.53125rpx;width:335.15625rpx;line-height:44.53125rpx;margin-left:0;margin-top:0;opacity:1;text-align:center;position:absolute;left:389.0625rpx;top:447.65625rpx;margin-right:0;",
          "textContent": "",
          "group": '',
          "itemIndex": 3,
          "eventHandler": "tapInnerLinkHandler"
        }
      ]
    },
    "goods": [
      // {
      //   "url": "../goodsDetail/goodsDetail",
      //   "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
      //   "about": "玲珑",
      //   "name": "独处盒子 体验装",
      //   "price": "118.00"
      // },
      // {
      //   "url": "../goodsDetail/goodsDetail",
      //   "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
      //   "about": "玲珑",
      //   "name": "独处盒子 体验装",
      //   "price": "118.00"
      // },
      // {
      //   "url": "../goodsDetail/goodsDetail",
      //   "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
      //   "about": "玲珑",
      //   "name": "独处盒子 体验装",
      //   "price": "118.00"
      // },
    ]
  },
  onLoad: function () {
    var that = this;
    // 获取轮播  
    // 获取为你推荐(分组)  
    // 获取分类  
    // 获取精选商品
    wx.request({
      url: app.globalData.host +'/xcx/get-home-page',
      success: function (res) {
        for (var key in that.data.groups.content){
          that.data.groups.content[key]['content'] = res.data.other.groups[key]['content'];
          that.data.groups.content[key]['textContent'] = res.data.other.groups[key]['textContent'];
          that.data.groups.content[key]['group'] = res.data.other.groups[key]['group'];
        }
        that.setData({
          goods: res.data.other.goods, classify: res.data.other.classify, 'carousel.content': res.data.other.carousel, groups: that.data.groups})
        // that.setData({goods: res.data.other.goods, classify: res.data.other.classify,groups: that.data.groups})
      }
    });
    
  },
  // 监控输入框输入的字符
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 搜索
  searchList: function (e) {
    wx.navigateTo({ url: '/pages/goods/index?type=search&value=' + this.data.inputValue})
  },
  // groups
  tapInnerLinkHandler: function (e) {
    let param = e.currentTarget.dataset.eventParams;
    console.log(param);
    wx.navigateTo({
      url: "/pages/goods/index?type=groups&value="+param
    });
  },
  // 轮播事件  
  carouselHandler:function(e){
    app.turnToPage('/pages/goodsDetail/goodsDetail?id=' + e.currentTarget.dataset.eventParams)
  }
})
