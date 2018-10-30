// pages/groupbuyingfiles/groupbuyingdetail/groupbuyingdetail.js

var app = getApp();
var utils = require('../../../utils/groupbuytools.js')
var showModalStatus = false
//productID
var productID='';
//商品goodid
var goodID = '';
//specArr保存规格参数的数组
var specArr = [];

//倒计时需要用到变量
var timer;
var countDown = 0;

var openID = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerHeight: wx.getSystemInfoSync().windowWidth,
    coupon_time_msg: '距开团结束还有',
    hour: '00',
    minute: '00',
    second: '00',
    groupMembers: '',
    productName: '',
    quantity: 1,
    groupon_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var url = app.globalData.groupon_detail + decodeURIComponent(options.getSubString);
    console.log(decodeURIComponent(options.getSubString).split("&")[1].split('='))
    var groupon_id = decodeURIComponent(options.getSubString).split("&")[1].split('=')[1];
    console.log('url ==== ' + url);
    var that = this;
    that.getData(url);
    that.setData({ groupon_id: groupon_id})
  },



  getData: function(URL) {
    var that = this;
    utils.octRequestWithUrl(URL, 'octmami', function(res) {

      goodID = res.data.row.goods_id;
      productID = res.data.row.default_product_id;
      specArr = res.data.spec;
      // 临时测试参数
      var promotionTemp = ['freeship'];

      var dataParamet = {
        banners: res.data.image,
        pageinfo: '1/' + res.data.image.length,
        normalPrice: '¥' + res.data.row.price,
        couponPrice: '¥' + res.data.groupon_goods_info.price,
        groupMembers: res.data.groupon_goods_info.group_members + '人团',
        productName: res.data.row.name + res.data.row.name + res.data.row.name,

      };

      if (specArr.length > 0) {
        var specT = '请选择';
        var specV = '';
        for (var i = 0; i < specArr.length; i++) {
          specV += specArr[i].spec_name + ' ';
        }
        dataParamet['sepcArray'] = specArr;
        dataParamet['specTitle'] = specT;
        dataParamet['specValue'] = specV;
        dataParamet['modalSpecValue'] = specT + specV;
        dataParamet['spevShowImage'] = res.data.image[0];
        dataParamet['modalSpecPrice'] = '¥' + res.data.row.price;

        // dataParamet['modalSpecPrice'] = '¥' + res.data.groupon_goods_info.price + '-' + res.data.row.price;

      };

      if (promotionTemp.length > 0) {
        dataParamet['promotion'] = promotionTemp;
      }

      if (res.data.groupon_info.length > 0) {
        dataParamet['grouponInfo'] = res.data.groupon_info;
      }

      if (res.data.has_comment) {
        dataParamet['has_comment'] = res.data.has_comment;
        dataParamet['commentPercent'] = res.data.comment.good_rate + '%';
        dataParamet['commentCount'] = res.data.comment.count + '人已评价';
        dataParamet['commentAuthor'] = res.data.comment.author;
        dataParamet['commentTime'] = res.data.comment.time;
        dataParamet['commentStar'] = res.data.comment.goods_point;
        dataParamet['commentText'] = res.data.comment.comment;
      }

      dataParamet['normalPrice'] = '¥' + res.data.row.price + ' 单独购买';
      dataParamet['grouponPrice'] = '¥' + res.data.groupon_goods_info.price + ' 我要开团';
      console.log(dataParamet);
      that.setData(dataParamet);


      clearInterval(timer);
      var downTime = res.data.groupon_goods_info.end_time - res.data.groupon_goods_info.begin_time;
      timer = setInterval(function() {
        if (downTime - countDown <= 0) {
          countDown = 0;
          clearInterval(timer);
          return;
        }
        countDown++;
        var h = Math.floor((downTime - countDown) / 3600);
        var m = Math.floor(((downTime - countDown) % 3600) / 60);
        var s = ((downTime - countDown) % 3600) % 60
        if (h < 10) {
          h = "0" + h;
        }
        if (m < 10) {
          m = "0" + m;
        }
        if (s < 10) {
          s = "0" + s;
        }

        that.setData({
          hour: h,
          minute: m,
          second: s,

        })

      }, 1000)


    }, function(msg) {
      wx.showToast({
        icon: 'none',
        title: msg + "",
        duration: 2000,

      })
    })

  },


  // 图片换方法
  pageChange: function(e) {
    var currentIndex = e.detail.current + 1;
    var pageLength = this.data.banners.length;
    this.setData({
      pageinfo: currentIndex + '/' + pageLength,
    })
  },


  //点击选择规格参数，弹出界面
  choiceSpec: function(e) {
    console.log("选择规格参数")

    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  //隐藏对话框
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },






  //规格参数点击事件
  itemCheck: function(e) {
    console.log(e)
    for (var i = 0; i < specArr[e.currentTarget.dataset.index].spec_value.length; i++) {
      specArr[e.currentTarget.dataset.index].spec_value[i]['isChecked'] = false;
    }
    specArr[e.currentTarget.dataset.index].spec_value[e.currentTarget.dataset.subindex]['isChecked'] = true;

    var specT = '请选择';

    var specV1 = '';
    var specV2 = '';
    var choiceNum = 0;
    console.log(specArr);
    var selectedSpec = '';
    for (var i = 0; i < specArr.length; i++) {

      var isCh = false;
      for (var j = 0; j < specArr[i].spec_value.length; j++) {
        if (specArr[i].spec_value[j].isChecked) {
          specV1 += specArr[i].spec_name;
          choiceNum++;

          isCh = true;
          selectedSpec += specArr[i].spec_value[j].spec_id + '-' + specArr[i].spec_value[j].spec_value_id + ' ';
          break;
        }
      }
      if (!isCh) {
        specV2 += specArr[i].spec_name;
      }
    }
    if (choiceNum == specArr.length) {
      var that = this;


      specT = '已选择';
      // console.log('选中全部规格 ==  ' + selectedSpec);
      var dValue = {
        'goods_id': goodID,
        'spec': selectedSpec
      };

      that.getSpecproduct(dValue);
    } else {
      specV1 = specV2;
    }
    this.setData({
      sepcArray: specArr,
      specTitle: specT,
      specValue: specV1,
      modalSpecValue: specT + specV1,
    })



  },

  //选择规格参数或许productid
  getSpecproduct: function(dataValue) {
    console.log(dataValue)
    var that = this;
    utils.octRequestWithUrlPost(app.globalData.groupon_specproduct, dataValue, function(res) {
      productID = res.product_id;
      that.setData({
        modalSpecPrice: '¥'+res.price,
      });
    }, function(msg) {
      wx.showToast({
        icon: 'none',
        title: msg + "",
        duration: 2000,
      })
    })
  },

  // 去拼单
  goGoupon:function(e){
    console.log(e.currentTarget.dataset.data)
    console.log('去拼团');
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          var group_id = e.currentTarget.dataset.data.begin_id
          that.getOpenID(res.code, group_id);
        } else {
          var msg = '获取code失败！' + res.errMsg;
          wx.showToast({
            icon: none,
            title: msg,
          })
        }
      }
    });
  },
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '4001521521',
    })
  },

  goComments: function() {
    wx.navigateTo({
      url: '../comments/comments?getGoodsID=' + goodID,
    })
  },

  //单独购买
  normalBuy: function() {
    var that = this
    console.log('单独购买')
    wx.navigateTo({
      url: '/index/index?page=/order/confirm&product_id=' + productID + '&quantity=1&groupon_id=' + that.data.groupon_id + '&group_id=0&goods_id=' + goodID
    })
  },


  //我要开团
  grouponBuy: function() {
    console.log('我要开团');
    var that = this;
    wx.login({
      success: function(res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          that.getOpenID(res.code);
        } else {
          var msg = '获取code失败！' + res.errMsg;
          wx.showToast({
            icon: none,
            title: msg,
          })
        }
      }
    });
  },

  //后台获取用户openID
  getOpenID: function(code, group_id = 0) {
    var that = this;
    utils.octRequestWithUrl(app.globalData.wxLogin + code, 'oct', function(res) {

      if (res.code == '200') {
        openID = res.data.openid;
        that.getUserInfo();
      } else if (res.code == '304') {
        wx.navigateTo({
          url: '/index/index?page=/order/confirm2&product_id=' + productID + '&quantity=1&groupon_id=' + that.data.groupon_id + '&group_id=' + group_id + '&goods_id=' + goodID + '&api_member_info='+res.data.member_info
        })
      }

    }, function(msg) {
      wx.showToast({
        icon: 'none',
        title: msg + "",
        duration: 2000,
      })
    })
  },

  //后台获取用户信息

  getUserInfo: function() {
    var that = this;
    wx.getUserInfo({
      withCredentials: true,
      timeout: 3000,
      success: function(res) {
        console.log(res);
        that.posUserInfo(res.userInfo);
      },
      fail: function() {
        wx.navigateTo({
          url: '../authorizationpage/authorizationpage',
        })
      },

    })
  },

  //
  posUserInfo: function(userInfo) {
    userInfo['openid'] = openID;
    console.log(userInfo);
    var that = this;
    utils.octRequestWithUrlPost(app.globalData.postUserInfo, userInfo, function(res) {
      if(res.code == 304){
        wx.navigateTo({
          url: '/index/index?page=/order/confirm2&product_id=' + productID + '&quantity=1&groupon_id=' + that.data.groupon_id + '&group_id=0&goods_id=' + goodID + '&api_member_info=' + res.data.member_info
        })
      }else if(res.code == 200){
        wx.navigateTo({
          url: '/index/index?page=/order/confirm2&product_id=' + productID + '&quantity=1&groupon_id=' + that.data.groupon_id + '&group_id=0&goods_id=' + goodID + '&openid=' + openID
        })
      }
      console.log(res);
    }, function(msg) {
      wx.showToast({
        icon: 'none',
        title: msg + "",
        duration: 2000,
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    countDown = 0;
    console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('onHide')
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})