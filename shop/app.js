
App({
  onLaunch: function () {
    // wx.openSetting({
    //   success: (res) => {
    //     console.log(res);
    //   }
    // })
    // 如果没登陆过进行登陆
    if (!wx.getStorageSync('xcx_openid')){
      this.login();
    }else{
      this.globalData.openid = wx.getStorageSync('xcx_openid')
    }
    if (wx.getStorageSync('xcx_cart_datas')){
      // 给购物车增加小红标志
      wx.setTabBarBadge({
        index: 1,
        text: ''+wx.getStorageSync('xcx_cart_datas').length
      })
    }
    
  },
  login:function(){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        if (res.code) {
          //发起网络请求, 获取openid、unionid
          wx.request({
            url: this.globalData.host + '/xcx/index',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res);
              // 存储openid
              if (res.data.code == 200) {
                getApp().globalData.openid = res.data.openid
                wx.setStorageSync('xcx_openid', res.data.openid)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  // 返回上一页
  turnBack: function (options) {
    options = options || {};
    wx.navigateBack({
      delta: options.delta || 1
    });
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
  // getAppCurrentPage: function () {
  //   let pages = getCurrentPages();
  //   return pages[pages.length - 1];
  // },
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
  // 获取用户数据
  getUserInfo: function(func){
    var that = this
    // 检查sessionkey是否失效  
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        that.login() //重新登录
      }
    })
    wx.getSetting({
      success: res => {
        // 如果已经授权，可以直接获取使用相应的权限获取数据，而不用弹窗
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              func(res)
            },
          })
        }else{
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.log('here')
              // 用户已经同意小程序使用 接口不会弹窗询问
              wx.getUserInfo({
                success: function (res) {
                  var userInfo = res.userInfo
                  var nickName = userInfo.nickName
                  var avatarUrl = userInfo.avatarUrl
                  var gender = userInfo.gender //性别 0：未知、1：男、2：女
                  var province = userInfo.province
                  var city = userInfo.city
                  var country = userInfo.country
                  func(res)
                },
                
              })
            },
            fail: function (res) {
              wx.openSetting({
                success: (res) => {
                  wx.getUserInfo({
                    success: function (res) {
                      var userInfo = res.userInfo
                      var nickName = userInfo.nickName
                      var avatarUrl = userInfo.avatarUrl
                      var gender = userInfo.gender //性别 0：未知、1：男、2：女
                      var province = userInfo.province
                      var city = userInfo.city
                      var country = userInfo.country
                      func(res)
                    },
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  // 获取用户收货地址数据
  getUserAddress: function (func) {
    wx.getSetting({
      success: res => {
        // 如果已经授权，可以直接获取使用相应的权限获取数据，而不用弹窗
        if (res.authSetting['scope.address']) {
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
              func(res)
            },
          })
        } else {
          wx.authorize({
            scope: 'scope.address',
            success() {
              console.log('here')
              // 用户已经同意小程序使用 接口不会弹窗询问
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
                  func(res)
                },

              })
            },
            fail: function (res) {
              wx.openSetting({
                success: (res) => {
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
                      func(res)
                    },
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  // 全局数据
  globalData: {
    tabBarPagePathArr: [
      "/pages/my/index",
      "/pages/index/index",
      "/pages/cart/index",
    ],
    userInfo: null,
    host: 'https://api.quutuu.com',
    // host: 'http://api.zbshop.com',
    // home
    // host: 'http://api.shop.com',
    imgHost: 'http://admin.quutuu.com',
    openid:null,
    unionid:null,
  },
  // 供确认订单使用
  goodsList: [],
})