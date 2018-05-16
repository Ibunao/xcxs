
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
    discountList: [],
    selectDiscountInfo: {},
    selectDiscountIndex: '',
    
    is_self_delivery: 0,
    express_fee: '',
    balance: '12',// 积分
    useBalance: true,// 使用积分
    deduction: '',
    discount_cut_price: '',
    // 商品价格
    original_price: '',
    totalPayment: '',
    shopAddress: '',
    noAdditionalInfo: true,
    exchangeCouponData: {
      dialogHidden: true,
      goodsInfo: {},
      selectModelInfo: {},
      hasSelectGoods: false,
      voucher_coupon_goods_info: {}
    }
  },
  isFromSelectAddress: false,
  // 提交的商品id
  cart_id_arr: [],
  cart_data_arr: [],
  requesting: false,
  additional_info: {},
  inputTimer: '',
  onLoad: function (options) {
    // 提交的商品信息
    this.setData({goodsList: app.globalData.goodsList})
    // 初始化
    this.dataInitial();
  },
  // 初始化
  dataInitial: function () {
    // 获取初始信息
    this.getCalculationInfo();
    // 获取地址
    this.getShopAddress();
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
    that.setData({ original_price:price})
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
  clickMinusButton: function(e){
    var index = e.currentTarget.dataset.index,
        goods = this.data.goodsList[index];
    if(+goods.num <= 0) return;
    this.changeGoodsNum(index, 'minus');
  },
  clickPlusButton: function(e){
    var index = e.currentTarget.dataset.index;
    this.changeGoodsNum(index, 'plus');
  },
  changeGoodsNum: function(index, type){
    var goods = this.data.goodsList[index],
        currentNum = +goods.num,
        targetNum = type == 'plus' ? currentNum + 1 : (type == 'minus' ? currentNum - 1 : Number(type)),
        that = this,
        data = {},
        param;

    if(targetNum == 0 && type == 'minus'){
      app.showModal({
        content: '确定从购物车删除该商品？',
        showCancel: true,
        confirm: function(){
          that.cart_data_arr[index].num = targetNum;
          data['goodsList['+index+'].num'] = targetNum;
          that.setData(data);
          that.deleteGoods(index);
        }
      })
      return;
    }

    param = {
      goods_id: goods.goods_id,
      model_id: goods.model_id || '',
      num: targetNum,
      sub_shop_app_id: that.franchisee_id,
      is_seckill : goods.is_seckill == 1 ? 1 : ''
    };
    app.sendRequest({
      hideLoading: true,
      url: '/index.php?r=AppShop/addCart',
      data: param,
      success: function(res){
        that.cart_data_arr[index].num = targetNum;
        data['goodsList['+index+'].num'] = targetNum;
        data.selectDiscountInfo = '';
        that.setData(data);
        that.getCalculationInfo();
      },
      fail: function(res){
        data = {};
        that.cart_data_arr[index].num = currentNum;
        data['goodsList['+index+'].num'] = currentNum;
        that.setData(data);
      }
    })
  },
  deleteGoods: function(index){
    var goodsList = this.data.goodsList,
        that = this,
        listExcludeDelete;

    app.sendRequest({
      url : '/index.php?r=AppShop/deleteCart',
      method: 'post',
      data: {
        cart_id_arr: [this.cart_data_arr[index].cart_id],
        sub_shop_app_id: this.franchisee_id
      },
      success: function(res){
        (listExcludeDelete = goodsList.concat([])).splice(index, 1);
        if(listExcludeDelete.length == 0){
          app.turnBack();
          return;
        }

        var deleteGoodsId = goodsList[index],
            noSameGoodsId = true;

        for (var i = listExcludeDelete.length - 1; i >= 0; i--) {
          if(listExcludeDelete[i].id == deleteGoodsId){
            noSameGoodsId = false;
            break;
          }
        }
        if(noSameGoodsId){
          delete that.additional_info[deleteGoodsId];
        }
        that.cart_data_arr.splice(index, 1);
        that.setData({
          goodsList: listExcludeDelete,
          selectDiscountInfo: '',
          exchangeCouponData: {
            dialogHidden: true,
            hasSelectGoods: false,
            voucher_coupon_goods_info: {}
          }
        })
        that.getCalculationInfo();
      }
    });
  },
  // 去付款
  confirmPayment: function(e){
    // 模拟支付结果
    wx.request({
      url: 'https://api.quutuu.com/order/pay',  
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        openid: app.globalData.openid
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
          },
          'fail': function (res) {
            console.log('fail');
          },
          'complete': function (res) {
            console.log('complete');
          }
        });
      },
      fail: function (res) {
        console.log(res.data)
      }
    }); return;
    //成功
    var pagePath = '/pages/goodsOrderPaySuccess/goodsOrderPaySuccess';
    app.turnToPage(pagePath, 1);
    // 失败
    // var pagePath = '/eCommerce/pages/groupOrderDetail/groupOrderDetail';
    // app.turnToPage(pagePath, 1);
    // var list = this.data.goodsList,
    //     that = this,
    //     selected_benefit = this.data.selectDiscountInfo,
    //     hasWritedAdditionalInfo = false;

    // if(this.data.is_self_delivery == 0 && !this.data.selectAddress.id){
    //   app.showModal({
    //     content: '请选择地址'
    //   });
    //   return;
    // }

    // for(var key in this.additional_info){
    //   if(key !== undefined){
    //     hasWritedAdditionalInfo = true;
    //     break;
    //   }
    // }
    // if(!this.data.noAdditionalInfo && !hasWritedAdditionalInfo){
    //   app.showModal({
    //     content: '请填写商品补充信息'
    //   });
    //   return;
    // }

    // if(this.requesting){
    //   return;
    // }
    // this.requesting = true;

    // app.sendRequest({
    //   url : '/index.php?r=AppShop/addCartOrder',
    //   method: 'post',
    //   data: {
    //     cart_arr: this.cart_data_arr,
    //     formId: e.detail.formId,
    //     sub_shop_app_id: this.franchisee_id,
    //     selected_benefit: selected_benefit,
    //     is_balance: this.data.useBalance ? 1 : 0,
    //     is_self_delivery: this.data.is_self_delivery,
    //     remark: this.data.orderRemark,
    //     address_id: this.data.selectAddress.id,
    //     additional_info: this.additional_info,
    //     voucher_coupon_goods_info: this.data.exchangeCouponData.voucher_coupon_goods_info
    //   },
    //   success: function(res){
    //     that.payOrder(res.data);
    //   },
    //   fail: function(){
    //     that.requesting = false;
    //   },
    //   successStatusAbnormal: function(){
    //     that.requesting = false;
    //   }
    // });
  },
  // 支付
  payOrder: function(orderId){
    var that = this;

    function paySuccess() {
      var pagePath = '/eCommerce/pages/goodsOrderPaySuccess/goodsOrderPaySuccess?detail=' + orderId + (that.franchisee_id ? '&franchisee='+that.franchisee_id : '') + '&is_group=' + !!that.is_group;
      if(!that.franchisee_id){
        app.sendRequest({
          url: '/index.php?r=AppMarketing/CheckAppCollectmeStatus',
          data: {
            'order_id': orderId
          },
          success: function(res){
            if(res.valid == 0) {
              pagePath += '&collectBenefit=1';
            }
            app.turnToPage(pagePath, 1);
          }
        });
      } else {
        app.turnToPage(pagePath, 1);
      }
    }

    function payFail(){
      if(that.is_group){
        app.turnToPage('/eCommerce/pages/groupOrderDetail/groupOrderDetail?id=' + orderId, 1);
      }else{
        app.turnToPage('/eCommerce/pages/goodsOrderDetail/goodsOrderDetail?detail=' + orderId, 1);
      }
    }
    // 如果是0不用请求微信支付
    if(this.data.totalPayment == 0){
      app.sendRequest({
        url: '/index.php?r=AppShop/paygoods',
        data: {
          order_id: orderId,
          total_price: 0
        },
        success: function(res){
          paySuccess();
        },
        fail: function(){
          payFail();
        },
        successStatusAbnormal: function () {
          payFail();
        }
      });
      return;
    }
    // 发送微信支付
    app.sendRequest({
      url: '/index.php?r=AppShop/GetWxWebappPaymentCode',
      data: {
        order_id: orderId
      },
      success: function (res) {
        var param = res.data;

        param.orderId = orderId;
        param.success = paySuccess;
        param.goodsType = 0;
        param.fail = payFail;
        that.wxPay(param);
      },
      fail: function(){
        payFail();
      },
      successStatusAbnormal: function () {
        payFail();
      }
    })
  },
  wxPay: function(param){
    var that = this;
    wx.requestPayment({
      'timeStamp': param.timeStamp,
      'nonceStr': param.nonceStr,
      'package': param.package,
      'signType': 'MD5',
      'paySign': param.paySign,
      success: function(res){
        param.success();
      },
      fail: function(res){
        if(res.errMsg === 'requestPayment:fail cancel'){
          param.fail();
          return;
        }
        app.showModal({
          content: '支付失败',
          complete: param.fail
        })
      }
    })
  },
  discountChange: function(e){
    var index = e.detail.value;

    this.setData({
      selectDiscountInfo: this.data.discountList[index],
      selectDiscountIndex: index,
      'exchangeCouponData.hasSelectGoods': false,
      'exchangeCouponData.voucher_coupon_goods_info': {}
    })
    this.getCalculationInfo();
  },
  goToMyAddress: function () {
    var addressId = this.data.selectAddress.id;
    this.isFromSelectAddress = true;
    app.turnToPage('/pages/myAddress/myAddress?id=' + addressId);
  },
  showAddAddress: function () {
    var _this = this;

    app.chooseAddress({
      success: function (res) {
        app.sendRequest({
          method: 'post',
          url: '/index.php?r=AppShop/AddWxAddress',
          data: {
            detailInfo: res.detailInfo || '',
            cityName: res.cityName || '',
            provinceName: res.provinceName || '',
            UserName: res.userName || '',
            telNumber: res.telNumber || '',
            district: res.district || '',
            countyName: res.countyName || ''
          },
          success: function () {
            _this.dataInitial();
          },
        })
      }
    })
  },
  makeStorePhoneCall: function(){
    app.makePhoneCall(this.data.shopAddress.shop_contact);
  },
  openStoreLocation: function(){
    var infor = this.data.shopAddress.region_string + this.data.shopAddress.shop_location;

    infor = infor.replace(/\s/g,'');
    app.sendRequest({
      url: '/index.php?r=Map/GetLatAndLngByAreaInfo',
      data: {
        location_info: infor
      },
      success: function (res) {
        if (res.result){
          wx.openLocation({
            latitude: res.result.location.lat,
            longitude: res.result.location.lng
          })
        }
      }
    });
  },
  useBalanceChange: function(e){
    this.setData({
      useBalance: e.detail.value
    });
    this.getCalculationInfo();
  },
  deliveryWayChange: function(e){
    this.setData({
      is_self_delivery: e.detail.value
    })
    this.getCalculationInfo();
  },
  goToAdditionalInfo: function(){
    app.setGoodsAdditionalInfo(this.additional_info);
    app.turnToPage('/eCommerce/pages/goodsAdditionalInfo/goodsAdditionalInfo');
  },
  exchangeCouponInit: function(id){
    var _this = this;
    app.sendRequest({
      url: '/index.php?r=AppShop/getGoods',
      data: {
        data_id: id
      },
      success: function (res) {
        var goods = res.data[0].form_data;
        var goodsModel = [];
        var selectModelInfo = {
          'models': [],
          'price': 0,
          'modelId': '',
          'models_text': '',
          'imgurl': ''
        };
        if(goods.model_items.length){
          // 有规格
          selectModelInfo['price'] = Number(goods.model_items[0].price);
          selectModelInfo['imgurl'] = goods.model_items[0].img_url;
          selectModelInfo['modelId'] = goods.model_items[0].id;
        } else {
          selectModelInfo['price'] = Number(goods.price);
          selectModelInfo['imgurl'] = goods.cover;
        }
        for(var key in goods.model){
          if(key){
            goodsModel.push(goods.model[key]); // 转成数组
            selectModelInfo['models'].push(goods.model[key].subModelId[0]);
            selectModelInfo['models_text'] += '“' + goods.model[key].subModelName[0] + '” ';
          }
        }
        goods.model = goodsModel; // 将原来的结构转换成数组
        _this.setData({
          'exchangeCouponData.dialogHidden': false, // 显示模态框
          'exchangeCouponData.goodsInfo': goods,
          'exchangeCouponData.selectModelInfo': selectModelInfo
        });
      }
    });
  },
  exchangeCouponHideDialog: function(){
    this.setData({
      selectDiscountInfo: this.data.discountList[0],
      selectDiscountIndex: 0,
      'exchangeCouponData.dialogHidden': true,
      'exchangeCouponData.hasSelectGoods': false,
      'exchangeCouponData.voucher_coupon_goods_info': {}
    })
    this.getCalculationInfo();
  },
  exchangeCouponSelectSubModel: function(e){
    var dataset = e.target.dataset,
        modelIndex = dataset.modelIndex,
        submodelIndex = dataset.submodelIndex,
        data = {},
        selectModels = this.data.exchangeCouponData.selectModelInfo.models,
        model = this.data.exchangeCouponData.goodsInfo.model,
        text = '';

    selectModels[modelIndex] = model[modelIndex].subModelId[submodelIndex];

    // 拼已选中规格文字
    for (let i = 0; i < selectModels.length; i++) {
      let selectSubModelId = model[i].subModelId;
      for (let j = 0; j < selectSubModelId.length; j++) {
        if( selectModels[i] == selectSubModelId[j] ){
          text += '“' + model[i].subModelName[j] + '” ';
        }
      }
    }
    data['exchangeCouponData.selectModelInfo.models'] = selectModels;
    data['exchangeCouponData.selectModelInfo.models_text'] = text;

    this.setData(data);
    this.exchangeCouponResetSelectCountPrice();
  },
  exchangeCouponResetSelectCountPrice: function(){
    var _this = this,
        selectModelIds = this.data.exchangeCouponData.selectModelInfo.models.join(','),
        modelItems = this.data.exchangeCouponData.goodsInfo.model_items,
        data = {};

    for (var i = modelItems.length - 1; i >= 0; i--) {
      if(modelItems[i].model == selectModelIds){
        data['exchangeCouponData.selectModelInfo.stock'] = modelItems[i].stock;
        data['exchangeCouponData.selectModelInfo.price'] = modelItems[i].price;
        data['exchangeCouponData.selectModelInfo.modelId'] = modelItems[i].id;
        data['exchangeCouponData.selectModelInfo.imgurl'] = modelItems[i].img_url;
        break;
      }
    }
    this.setData(data);
  },
  exchangeCouponConfirmGoods: function(){
    let _this = this;
    let goodsInfo = _this.data.exchangeCouponData.goodsInfo;
    let model = goodsInfo.model;
    let selectModels = _this.data.exchangeCouponData.selectModelInfo.models;
    let model_value_str = '';
    if(selectModels.length > 0){
      model_value_str = '(';
      for (let i = 0; i < selectModels.length; i++) {
        let selectSubModelId = model[i].subModelId;
        for (let j = 0; j < selectSubModelId.length; j++) {
          if( selectModels[i] == selectSubModelId[j] ){
            model_value_str += model[i].subModelName[j] + '|';
          }
        }
      }
      model_value_str += ')';
    }
    goodsInfo['model_value_str'] = model_value_str;
    _this.setData({
      'exchangeCouponData.dialogHidden': true,
      'exchangeCouponData.selectModelInfo': {},
      'exchangeCouponData.hasSelectGoods': true,
      'exchangeCouponData.voucher_coupon_goods_info': {
        goods_id: goodsInfo.id,
        num: 1,
        model_id: _this.data.exchangeCouponData.selectModelInfo.modelId
      },
      'exchangeCouponData.goodsInfo': goodsInfo
    });
    _this.getCalculationInfo();
  },
  inputGoodsCount: function (e) {
    let value = +e.detail.value;
    let index = e.target.dataset.index;

    if (isNaN(value) || value <= 0) {
      return;
    }
    clearTimeout(this.inputTimer);
    this.inputTimer = setTimeout(() => {
      this.changeGoodsNum(index, value);
    }, 500);
  }
})
