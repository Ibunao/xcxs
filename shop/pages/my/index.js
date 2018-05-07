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
        "appendComponent": ["myAddress", "myIntegral"] 
      }, 
      "animations": [], 
      "page_form": "", 
      "compId": "user_center1", 
      "parentCompid": "user_center1" 
    }, 
    // 用户信息
    "userInfo":{
      // 用户头像
      cover_thumb:"",
      // 用户名
      nickname:"点击登陆",
    }
  },
  onLoad: function (e) {
    if (wx.getStorageSync('xcx_user_info')){
      app.globalData.userInfo = wx.getStorageSync('xcx_user_info');
      // this.data.userInfo.cover_thumb = app.globalData.userInfo.avatarUrl;
      // this.data.userInfo.nickname = app.globalData.userInfo.nickName;
      this.setData({
        'userInfo.cover_thumb': app.globalData.userInfo.avatarUrl,
        'userInfo.nickname': app.globalData.userInfo.nickName
      })
    }
  },

  onShow: function () {

  },
  
  onUnload: function () {
    
  },
  // 检查登陆、登陆
  userCenterUserInfo: function (event) {
    if (!wx.getStorageSync('xcx_user_info')){
      var that = this;
      app.getUserInfo(function (resp) {
        console.log(resp)
        // 传递给后台
        wx.request({
          url: app.globalData.host + '/xcx/save-user-info',
          data: {
            nickName: resp.nickName,
            avatarUrl: resp.avatarUrl,
            city: resp.city,
            country: resp.country,
            gender: resp.gender,
            language: resp.language,
            province: resp.province,
            openid: app.globalData.openid,
            unionid: app.globalData.unionid
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            console.log(res);
            // 存储openid
            if (res.data.code == 200) {
              app.globalData.userInfo = resp
              wx.setStorageSync('xcx_user_info', resp)
              that.setData({
                'userInfo.cover_thumb': app.globalData.userInfo.avatarUrl,
                'userInfo.nickname': app.globalData.userInfo.nickName
              })
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
  userCenterLocation: function(event) {
    // 使用微信的地址
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)

        // 上传地址

      }
    })
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

  }
};
Page(pageData);
