
var app = getApp()
Page({
  data: {
    // 商品列表
    goodsList: [
      // {
      //   id: 1,
      //   selected: true,
      //   editSelected: true,
      //   cover: "https://image.octmami.com/public/images/7e/ee/65/9293f477b8edac2b6958b5ee9401184bd09bc555.jpg",
      //   title: "测试商品",
      //   model_value_str: "测试",
      //   price: 198,
      //   num: 5,
      // }
    ],
    // 留言
    orderRemark: '',
    // 选择的地址
    selectAddress: {
      id:'',
      address_info:{
        name:"",
        contact:"",
        detailAddress:"",
      }
    },
    // 运费
    express_fee: 5,
    haveIntegrals:0, // 拥有的积分
    useIntegrals:0, // 使用的积分
    deduction: 0,// 积分折扣金额
    // 商品价格
    original_price: '',
    totalPayment: '',// 支付金额
    orderid:'',// 订单id
    type:'',// 如果购物车过来则为cart
  },
  onLoad: function (options) {
    // 提交的商品信息
    this.setData({goodsList: app.globalData.goodsList})
    this.setData({type:options.type})
    // 初始化
    this.dataInitial();
  },
  // 初始化
  dataInitial: function () {
    // 获取初始信息
    this.getCalculationInfo();
    // 获取地址
    this.getShopAddress();
    // 获取积分
    this.getIntegrals();
  },
  onShow: function(){

  },

  // 计算金额、运费
  getCalculationInfo: function(){
    var that = this;
    var goodsList = that.data.goodsList;
    var price = 0;
    for(var item of goodsList){
      // console.log(item)
      price += parseFloat(item.price)*parseInt(item.num)
    }
    // 满减邮费
    if(price >= 80){
      that.setData({ express_fee:0})
    }else{
      that.setData({ express_fee: 5 })
    }
    // 商品金额
    that.setData({ original_price:price})
    // 支付金额
    that.setData({ totalPayment: price + that.data.express_fee })
    
  },
  // 获取积分
  getIntegrals:function(){
    var that = this;
    // 获取积分
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
          that.setData({ haveIntegrals: res.data.other.integral })
        } else {
          that.setData({ haveIntegrals: 0 })
        }
      }
    })
  },
  // 获取用户邮寄地址
  getShopAddress:function(){
    var that = this;
    if (wx.getStorageSync('xcx_user_address')){
      var res = wx.getStorageSync('xcx_user_address')
      that.setData({selectAddress: {
        id: '1',
        address_info:{
          name: res.userName,
          contact: res.telNumber,
          detailAddress: res.provinceName + res.cityName + res.countyName+res.detailInfo,
        }
      }})
    }
  },
  // 收货地址管理
  userCenterAddress: function (event) {
    var that = this
    // 使用微信的地址
    app.getUserAddress(function (res) {
      // 保存到本地
      wx.setStorageSync('xcx_user_address', res)
      that.setData({
        selectAddress: {
          id: '1',
          address_info: {
            name: res.userName,
            contact: res.telNumber,
            detailAddress: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          }
        }
      })
      // 传递给后台, 暂时不用传递
    })
  },
  remarkInput: function (e) {
    var value = e.detail.value;
    if(value.length  > 30){
      app.showModal({
        content: '最多只能输入30个字'
      });
      value = value.slice(0, 30);
    }

    this.setData({
      orderRemark: value
    });
  },
  previewImage: function (e) {
    app.previewImage({
      current: e.currentTarget.dataset.src
    });
  },
  // clickMinusButton: function(e){
  //   var index = e.currentTarget.dataset.index,
  //       goods = this.data.goodsList[index];
  //   if(+goods.num <= 0) return;
  //   this.changeGoodsNum(index, 'minus');
  // },
  // clickPlusButton: function(e){
  //   var index = e.currentTarget.dataset.index;
  //   this.changeGoodsNum(index, 'plus');
  // },
  // changeGoodsNum: function(index, type){
  //   var goods = this.data.goodsList[index],
  //       currentNum = +goods.num,
  //       targetNum = type == 'plus' ? currentNum + 1 : (type == 'minus' ? currentNum - 1 : Number(type)),
  //       that = this,
  //       data = {},
  //       param;

  //   if(targetNum == 0 && type == 'minus'){
  //     app.showModal({
  //       content: '确定从购物车删除该商品？',
  //       showCancel: true,
  //       confirm: function(){
  //         that.cart_data_arr[index].num = targetNum;
  //         data['goodsList['+index+'].num'] = targetNum;
  //         that.setData(data);
  //         that.deleteGoods(index);
  //       }
  //     })
  //     return;
  //   }

  //   param = {
  //     goods_id: goods.goods_id,
  //     model_id: goods.model_id || '',
  //     num: targetNum,
  //     sub_shop_app_id: that.franchisee_id,
  //     is_seckill : goods.is_seckill == 1 ? 1 : ''
  //   };
  //   app.sendRequest({
  //     hideLoading: true,
  //     url: '/index.php?r=AppShop/addCart',
  //     data: param,
  //     success: function(res){
  //       that.cart_data_arr[index].num = targetNum;
  //       data['goodsList['+index+'].num'] = targetNum;
  //       data.selectDiscountInfo = '';
  //       that.setData(data);
  //       that.getCalculationInfo();
  //     },
  //     fail: function(res){
  //       data = {};
  //       that.cart_data_arr[index].num = currentNum;
  //       data['goodsList['+index+'].num'] = currentNum;
  //       that.setData(data);
  //     }
  //   })
  // },
  // deleteGoods: function(index){
  //   var goodsList = this.data.goodsList,
  //       that = this,
  //       listExcludeDelete;

  //   app.sendRequest({
  //     url : '/index.php?r=AppShop/deleteCart',
  //     method: 'post',
  //     data: {
  //       cart_id_arr: [this.cart_data_arr[index].cart_id],
  //       sub_shop_app_id: this.franchisee_id
  //     },
  //     success: function(res){
  //       (listExcludeDelete = goodsList.concat([])).splice(index, 1);
  //       if(listExcludeDelete.length == 0){
  //         app.turnBack();
  //         return;
  //       }

  //       var deleteGoodsId = goodsList[index],
  //           noSameGoodsId = true;

  //       for (var i = listExcludeDelete.length - 1; i >= 0; i--) {
  //         if(listExcludeDelete[i].id == deleteGoodsId){
  //           noSameGoodsId = false;
  //           break;
  //         }
  //       }
  //       if(noSameGoodsId){
  //         delete that.additional_info[deleteGoodsId];
  //       }
  //       that.cart_data_arr.splice(index, 1);
  //       that.setData({
  //         goodsList: listExcludeDelete,
  //         selectDiscountInfo: '',
  //         exchangeCouponData: {
  //           dialogHidden: true,
  //           hasSelectGoods: false,
  //           voucher_coupon_goods_info: {}
  //         }
  //       })
  //       that.getCalculationInfo();
  //     }
  //   });
  // },
  // 去付款
  confirmPayment: function(e){
    var that = this
    if (that.data.selectAddress.address_info.name == ''){
      app.showModel({title:'缺少信息', content:'请选择收获地址'});
      return;
    }
    
    wx.request({
      url: app.globalData.host + '/order/create',
      data:{
        openid: app.globalData.openid,
        data: that.data
      },
      method: 'POST',
      success: function (res) {
        if(res.data.code == 400){
          // 请求的参数不对
          wx.showModal({
            title: '信息不完整',
            content: res.data.msg,
          })
          return;
        }
        that.setData({ orderid: res.data.other.orderid})
        // 模拟支付结果
        wx.request({
          // 支付还是用线上，测试环境回调不到
          url: 'https://api.quutuu.com/order/pay',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {
            openid: app.globalData.openid,
            orderid: that.data.orderid
          },
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            console.log(res.data.other);
            console.log('调起支付');
            wx.requestPayment({
              'timeStamp': res.data.other.timeStamp,
              'nonceStr': res.data.other.nonceStr,
              'package': res.data.other.package,
              'signType': 'MD5',
              'paySign': res.data.other.paySign,
              'success': function (res) {
                console.log('success');
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 3000
                });
                if(that.data.type == 'cart'){
                  // 删除购物车以提交的商品
                  var cartGoods = wx.getStorageSync('xcx_cart_datas')
                  if(cartGoods.length == that.data.goodsList.length){
                    wx.setStorageSync('xcx_cart_datas', [])
                  }else{
                    for (var key in that.data.goodsList){
                      for (var kk in cartGoods){
                        if (that.data.goodsList[key].id == cartGoods[kk].id){
                          cartGoods.splice(kk, 1);
                        }
                      }
                    }
                    wx.setStorageSync('xcx_cart_datas', cartGoods)
                  }
                }
                
                // 计算赠送的积分  
                var integral = parseInt(that.data.totalPayment);
                var orderid = that.data.orderid;
                //成功
                var pagePath = '/pages/goodsOrderPaySuccess/goodsOrderPaySuccess?integral=' + integral+'&orderid='+orderid;
                app.turnToPage(pagePath, 1);
              },
              'fail': function (res) {
                console.log(res);
              },
              'complete': function (res) {
                console.log('complete');
              }
            });
          },
          fail: function (res) {
            console.log(res.data)
          }
        });
      }
    })
    
  },
  // 使用积分
  useBalanceChange: function(e){
    console.log(e)
    // 重新计算价格
    if (!e.detail.value){
      this.getCalculationInfo()
      this.setData({ useIntegrals:0})
    }else{
      var haveIntegrals = this.data.haveIntegrals,
        totalPrice = this.data.totalPayment,
        useIntegrals = 0, // 使用的积分
        deduction = 0;// 积分折扣金额
      if (haveIntegrals <= totalPrice) {
        useIntegrals = haveIntegrals;
        deduction = useIntegrals;
        totalPrice = totalPrice - deduction
      } else {
        useIntegrals = Math.ceil(totalPrice);
        deduction = totalPrice;
        totalPrice = totalPrice - deduction
      }
      this.setData({
        useIntegrals: useIntegrals,
        deduction: deduction,
        totalPayment: totalPrice
      });
    }
  },
})
