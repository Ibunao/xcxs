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
      nickname:"ibunao",
    }
  },
  onLoad: function (e) {
  },

  onShow: function () {

  },
  
  onUnload: function () {
    
  },
  // 检查登陆、登陆、调转到相应的页面
  userCenterTurnToPage: function (event) {
    // let that = this;
    // if (this.isLogin()) {
    //   this._userCenterToPage(event);
    // } else {
    //   this.goLogin({
    //     success: function () {
    //       that._userCenterToPage(event);
    //     }
    //   });
    // }
  },
};
Page(pageData);
