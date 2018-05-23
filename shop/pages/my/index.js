var app = getApp();

var pageData = {
  data: { 
    "user_center":{ 
      "type": "user-center", 
      "content": "", 
      "customFeature": { 
        "mode": 1, 
        // 第一块
        "topSectionStyle": { 
          // 设置背景颜色
          "background-color": "", 
          // 字体颜色
          "color":"",
          // 设置背景图片
          "background-image": "url(http:\/\/img.weiye.me\/zcimgdir\/album\/file_599e853d1eb8f.jpg)",
          // 设置透明度
          "opacity":0.9,
          // 字体大小
        },
        // 添加列表的样式
        "appendComponentAttr": { 
          "myAddress": { 
            "margin-top": "-1px", 
            "openVerifyPhone": false 
          },
          "myOrder": { 
            "margin-top": "-1px", 
            "openVerifyPhone": false 
          }, 
          "shoppingCart": { 
            "margin-top": "-1px", 
            "openVerifyPhone": false 
          }, 
          "myMessage": { 
            "margin-top": "-1px", 
            "openVerifyPhone": false 
          }, 
          "vipCard": { 
            "margin-top": "-1px", 
            "openVerifyPhone": false 
          }, 
          "coupon": { 
            "margin-top": "-1px", 
            "openVerifyPhone": false 
          }, 
          "myIntegral": { 
            "margin-top": "-1px", 
            "openVerifyPhone": false 
          }, 
          "balance": { 
            "margin-top": "-1px", 
            "openVerifyPhone": false 
          }, 
          "myGroup": { 
            "margin-top": "-1px", 
            "openVerifyPhone": false 
          }, 
          "winningRecord": { 
            "margin-top": "-1px", 
            "openVerifyPhone": false 
          }, 
          "myVideo": { 
            "margin-top": "-1px", 
            "openVerifyPhone": false 
          }
        }, 
        // 显示的列表 "myAddress", "myOrder", "shoppingCart", "myMessage", "vipCard", "coupon", "myIntegral", "balance", "myGroup", "winningRecord"
        "appendComponent": ["myIntegral"] 
      }, 
      "animations": [], 
      "page_form": "", 
      "compId": "user_center1", 
      "parentCompid": "user_center1",
      
    }, 
    // 用户信息
    "userInfo":{
      // 用户头像
      cover_thumb:"",
      // 用户名
      nickname:"点击登陆",
    },
    "dai":{
      // 代付款先不做
      'daifu': '',
      'daifa': '',
      'daishou': '',
      'daiping': '',
    }
    
  },
  onLoad: function (e) {
    var that = this;
    if (wx.getStorageSync('xcx_user_info')){
      app.globalData.userInfo = wx.getStorageSync('xcx_user_info');
      // this.data.userInfo.cover_thumb = app.globalData.userInfo.avatarUrl;
      // this.data.userInfo.nickname = app.globalData.userInfo.nickName;
      this.setData({
        'userInfo.cover_thumb': app.globalData.userInfo.avatarUrl,
        'userInfo.nickname': app.globalData.userInfo.nickName
      });
    }
    // 查询订单情况  
    wx.request({
      url: app.globalData.host + '/order/condition',
      data: {
        openid: wx.getStorageSync('xcx_openid')
      },
      success: function (res) {
        var data = res.data.other;
        that.setData({ 'dai.daifa': data.daifa, ' dai.daifu': data.daifu, 'dai.daishou': data.daishou, 'dai.daiping': data.daiping })
      }
    })
  },

  onShow: function () {

  },
  
  onUnload: function () {
    
  },
  // 检查登陆、登陆
  userCenterUserInfo: function (event) {
    var that = this;
    console.log(that)
    if (!wx.getStorageSync('xcx_user_info')){
      
      app.getUserInfo(function (resp) {
        console.log(resp)
        app.globalData.userInfo = resp
        wx.setStorageSync('xcx_user_info', resp.userInfo)
        console.log(that.userInfo)
        that.setData({
          'userInfo.cover_thumb': app.globalData.userInfo.avatarUrl,
          'userInfo.nickname': app.globalData.userInfo.nickName
        })
        resp.openid = wx.getStorageSync('xcx_openid')
        // 传递给后台
        wx.request({
          url: app.globalData.host + '/xcx/save-user-info',
          data: {
            openid:resp.openid,
            userInfo: resp.userInfo,
            rawData: resp.rawData,
            signature: resp.signature,
            encryptedData: resp.encryptedData,
            iv: resp.iv
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            console.log(res);
            // 存储openid
            if (res.data.code == 200) {
              
            }
          }
        })

      });
    }
    // else{
    //   app.globalData.userInfo = wx.getStorageSync('xcx_user_info');
    // }
    
  },
  // 收货地址管理
  userCenterAddress: function(event) {
    if (!wx.getStorageSync('xcx_user_address')) {
      // 使用微信的地址
      app.getUserAddress(function(res){
        // 保存到本地
        wx.setStorageSync('xcx_user_address', res)
        // 传递给后台, 暂时不用传递
        // wx.request({
        //   url: app.globalData.host + '/xcx/save-user-info',
        //   data: {
        //     nickName: resp.nickName,
        //     avatarUrl: resp.avatarUrl,
        //     city: resp.city,
        //     country: resp.country,
        //     gender: resp.gender,
        //     language: resp.language,
        //     province: resp.province,
        //     openid: app.globalData.openid,
        //     unionid: app.globalData.unionid
        //   },
        //   method: "POST",
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded' // 默认值
        //   },
        //   success: function (res) {
        //     console.log(res);
        //     // 存储openid
        //     if (res.data.code == 200) {
        //       app.globalData.userInfo = resp
        //       wx.setStorageSync('xcx_user_info', resp)
        //       that.setData({
        //         'userInfo.cover_thumb': app.globalData.userInfo.avatarUrl,
        //         'userInfo.nickname': app.globalData.userInfo.nickName
        //       })
        //     }
        //   }
        // })
      })
    }
  },
  userCenterIntegral:function(){
    wx.request({
      url: app.globalData.host + '/xcx/get-integral',
      // 需要更改为动态的memberid
      data: {
        openid: app.globalData.openid,
        memberId: 1,
      },
      success: function (res) {
        console.log(res);
        // 存储openid
        if (res.data.code == 200) {
          app.showModal({
            title: '积分提示',
            content: '您的积分为 ' + res.data.other.integral
          })
        }
      }
    })
  },
  // 跳转
  userCenterTurnToPage:function(event) {

  },
  orderInfo:function(event){
    var type = event.target.dataset.index;
    let pagePath = '/pages/goodsOrderDetail/goodsOrderDetail?type='+type;
    app.turnToPage(pagePath, true);
  }
};
Page(pageData);
