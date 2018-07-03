var app = getApp()
Page({
  data: {
    // 请求到的商品信息
    goodsData:'',
    // 商品id
    goodsId: '',
    shareShow: true,
    goodsInfo: {
      // 图片数组 false表示没有
      img_urls:[
        // "https://image.octmami.com/public/images/7e/ee/65/9293f477b8edac2b6958b5ee9401184bd09bc555.jpg",
        // "https://image.octmami.com/public/images/d2/98/42/3a589c8aaddbb509addb0ec2f4c048f3e7e8085c.jpg",
        // "https://image.octmami.com/public/images/7e/ee/65/9293f477b8edac2b6958b5ee9401184bd09bc555.jpg",
      ],
      //默认图片
      cover: "/images/my.png",
      // 商品名
      title: "费雪Fisher Price 小象安抚巾",
      // 最低的价格
      lowPrice: 30,
      // 最高的价格
      highPrice: 50,
      // 如果最低价格等于最高价格或者最低价格=0，显示价格
      price:60,
      // 运费
      express_fee:5,
      // 库存
      stock: 10,
      // 规格
      model: [
        {
          name : 'S',
          value : 17,
          subModelName : {
            55 : '墨绿',
            56 : '湖蓝'
          }
        },
        {
          name: 'M',
          value: 18,
          subModelName: {
          57: '墨绿',
          58: '湖蓝'
        }
        }
      ],
    },
    // 商品参数
    goodsParams:[
      // {name:"重量", value:"10kg"},
      // { name: "重量", value: "10kg" },
      // { name: "重量", value: "10kg" },
      // { name: "重量", value: "10kg" },
    ],
    // 是否隐藏库存
    hidestock:false,
    // 是否隐藏商品评论
    displayComment: false,
    // 评论条数
    commentNums: 10,
    // 评论内容
    commentExample: {
      // 用户头像
      buyer_headimgurl:"/images/my.png",
      // 用户名
      buyer_nickname:"丁冉",
      // 购买时间
      add_time:"2018",
      // 评论信息
      assess_info:{
        // 评论内容
        content:"好评，必须好评",
        // 是否有图片
        has_img:true,
        // 图片信息
        img_arr:[
          "https://image.octmami.com/public/images/7e/ee/65/9293f477b8edac2b6958b5ee9401184bd09bc555.jpg",
          "https://image.octmami.com/public/images/d2/98/42/3a589c8aaddbb509addb0ec2f4c048f3e7e8085c.jpg",
        ]
      }
    },
    // 商品详情
    goodsDetail:{
      // 是否是图片
      isImg:true,
      // 文字详情
      detailTxt:"详情内容",
      // 图片详情
      detailImgs:[
        // "http://image.octmami.com/public/images/7b/c8/3b/b7052d99fdd90a87a25b1411ec80e6aa92edacc8.png?1458724526#w",
        // "http://image.octmami.com/public/images/d7/27/da/0ebf90856b3864f27e4640edf5f39138ef349251.png?1458724540#w",
        // "http://image.octmami.com/public/images/09/49/7e/1873d54fb478cb58c2fb53254ff2e8bbacdf0d8d.png?1458724572#w",
      ]
    },
    // 选择商品的详情，加入购物车或者立即购买使用
    selectModelInfo: {
      modelId:'',
      // 图片地址
      imgurl: "https://image.octmami.com/public/images/7e/ee/65/9293f477b8edac2b6958b5ee9401184bd09bc555.jpg",
      price: '',
      buyCount: 1,
      // 库存
      stock: 0,
      // 已选
      models_text : '',
      models:{},
    },
    // 分享相关数据
    pageQRCodeData:{
      shareDialogShow: "100%",
      shareMenuShow: false,
    },
    // 是否显示购物或立即购买弹窗
    addToShoppingCartHidden: true,
    ifAddToShoppingCart: true,
  },
  // 显示购物页面
  showAddToShoppingCart: function () {
    this.setData({
      addToShoppingCartHidden: false,
      ifAddToShoppingCart: true
    })
  },
  // 隐藏购物页面
  hiddeAddToShoppingCart: function () {
    this.setData({
      addToShoppingCartHidden: true
    })
  },
  // 增加数量
  clickPlusButton: function (e) {
    var selectModelInfo = this.data.selectModelInfo,
      goodsInfo = this.data.goodsInfo,
      count = selectModelInfo.buyCount,
      stock = selectModelInfo.stock;

    if (count >= stock) {
      wx.showModal({
        title: '提示',
        content: '购买数量不能大于库存',
      })
      return;
    }
    this.setData({
      'selectModelInfo.buyCount': count + 1
    });
  },
  // 减数量
  clickMinusButton: function (e) {
    var count = this.data.selectModelInfo.buyCount;

    if (count <= 1) {
      return;
    }
    this.setData({
      'selectModelInfo.buyCount': count - 1
    });
  },

  // 加入购物车
  sureAddToShoppingCart: function () {
    // 选择的规格
    var  selectModels = this.data.selectModelInfo.models
    // 规格选择完整才能提交购物车
    if (Object.getOwnPropertyNames(selectModels).length != this.data.goodsInfo.model.length) {
      app.showModal({
        title: '请选择规格',
        content: '请选择完整的规格'
      });
      return;
    }
    var that = this;
    var cartData = {
      id: this.data.goodsId,
      cover: this.data.selectModelInfo.imgurl,
      title: this.data.goodsInfo.title,
      model_value_str: this.data.selectModelInfo.models_text,
      price: this.data.selectModelInfo.price,
      num: this.data.selectModelInfo.buyCount,
      specId: this.data.selectModelInfo.modelId,
      specs: this.data.selectModelInfo.models,
    };
    // 发送数据存储购物车(暂时不存),存入本地
    if (!wx.getStorageSync('xcx_cart_datas')){
      wx.setStorageSync('xcx_cart_datas', [cartData]);
    }else{
      var haveCartData = wx.getStorageSync('xcx_cart_datas');
      var isHave = false;
      for(var item in haveCartData){
        console.log(item);
        if (haveCartData[item].id == cartData.id && haveCartData[item].specId == cartData.specId){
          haveCartData[item].num += cartData.num;
          isHave = true;
        }
      }
      if(!isHave){
        haveCartData.push(cartData)
      }
      wx.setStorageSync('xcx_cart_datas', haveCartData);
    }
    // 发送添加到购物车的请求
    // wx.request({
    //   url: app.globalData.host+'/goods/set-cart',
    //   data: cartData,
    //   success: function (res) {
    //     wx.showToast({
    //       title: '添加成功'
    //     })
    //   }
    // });
    wx.showToast({
      title: '添加成功'
    })
    setTimeout(function () {
      that.hiddeAddToShoppingCart();
    }, 1000);
  },
  // 立即购买
  showBuyDirectly: function () {
    this.setData({
      addToShoppingCartHidden: false,
      ifAddToShoppingCart: false
    })
  },
  // 立即购买下一步
  buyDirectlyNextStep: function (e) {
    // 跳转结算页面 previewGoodsOrder
    // 选择的规格
    var selectModels = this.data.selectModelInfo.models
    // 规格选择完整才能提交购物车
    if (Object.getOwnPropertyNames(selectModels).length != this.data.goodsInfo.model.length) {
      app.showModal({
        title: '请选择规格',
        content: '请选择规格'
      });
      return;
    }
    // 使用全局传递数据
    app.globalData.goodsList = [{
      id: this.data.goodsId,
      cover: this.data.selectModelInfo.imgurl,
      title: this.data.goodsInfo.title,
      model_value_str: this.data.selectModelInfo.models_text,
      price: this.data.selectModelInfo.price,
      num: this.data.selectModelInfo.buyCount,
      specId: this.data.selectModelInfo.modelId,
      specs: this.data.selectModelInfo.models,
    },];
    app.turnToPage('/pages/previewGoodsOrder/previewGoodsOrder')
  },
  // 分享
  // showQRCodeComponent: function () {
  //   let that = this;
  //   let goodsInfo = this.data.goodsInfo;
  //   let animation = wx.createAnimation({
  //     timingFunction: "ease",
  //     duration: 400,
  //   })
  //   // 模拟
  //   animation.bottom("0").step();
  //   that.setData({
  //     "pageQRCodeData.shareDialogShow": 0,
  //     "pageQRCodeData.shareMenuShow": true,
  //     "pageQRCodeData.page": that,
  //     "pageQRCodeData.imageUrl": "http://image.octmami.com/public/images/7b/c8/3b/b7052d99fdd90a87a25b1411ec80e6aa92edacc8.png?1458724526#w",// 图片分享图片地址
  //     "pageQRCodeData.animation": animation.export()
  //   });
  //   // 发送请求获取分享图片
  //   // app.sendRequest({
  //   //   url: '/AppShop/ShareQRCode',
  //   //   data: {
  //   //     obj_id: that.data.goodsId,
  //   //   },
  //   //   success: function (res) {
  //   //     animation.bottom("0").step();
  //   //     that.setData({
  //   //       "pageQRCodeData.shareDialogShow": 0,
  //   //       "pageQRCodeData.shareMenuShow": true,
  //   //       "pageQRCodeData.page": that,
  //   //       "pageQRCodeData.imageUrl": res.data,// 图片分享图片地址
  //   //       "pageQRCodeData.animation": animation.export()
  //   //     })
  //   //   }
  //   // })
  // },
  onLoad: function(options){
    // options 获取打开当前页面所调用的 query 参数。
    console.log(options);
    var goodsId = options.id;
    this.setData({ goodsId: goodsId})
    this.dataInitial(goodsId);
  },
  // 初始化数据, 获取初始数据
  dataInitial: function (gid) {
    var that = this;
    wx.request({
      url: app.globalData.host + '/goods/get-goods-info',
      data: {gid : gid},
      success: function (res) {
        console.log(res);
        if (res.data) {
          that.data.goodsData = res.data;
          var img_urls = [];
          // 主图添加到轮播
          img_urls.push(app.globalData.imgHost+res.data.info['image']);
          // 初始化立即后买/加入购物车的小弹窗数据
          that.setData({ 'selectModelInfo.imgurl': app.globalData.imgHost + res.data.info['image'], 'selectModelInfo.stock': res.data.info.stores,'selectModelInfo.price': res.data.info.wx_price})
          // 把规格图片添加到轮播
          // for (var item of res.data.info['specImg']){
          //   img_urls.push(app.globalData.imgHost + item);
          // }
          // 把其他的图片也添加进来
          for (var item of res.data['otherImg']) {
            img_urls.push(app.globalData.imgHost + item);
          }
          var goodsInfo = {
            img_urls : img_urls,
            cover: '/images/goodsDefault.png',
            title: res.data.info.name,
            lowPrice: res.data.info.wx_price,
            price: res.data.info.wx_price,
            express_fee: '0',
            stock: res.data.info.stores,
            model: res.data.info.specCheck,
          }
          var goodsParams = [];
          for(var key in res.data.attri){
            goodsParams.push({ name: key, value: res.data.attri[key]})
          }
          var goodsDetail = {};
          goodsDetail.isImg = res.data.info.desc == 1 ? false : true;
          if (goodsDetail.isImg){
            goodsDetail.detailImgs = [];
            for (var item of res.data.detailImg){
              goodsDetail.detailImgs.push(app.globalData.imgHost + item)
            }
          }else{
            goodsDetail.detailTxt = res.data.detailImg
          }
          that.setData({ 'goodsDetail': goodsDetail })
          that.setData({ 'goodsParams': goodsParams })
          that.setData({ 'goodsInfo': goodsInfo })
        } else {
          app.showModal({ content: '没有此商品' })
        }
      }
    })
  },
  // 跳转到购物车页面
  goCartpage: function(){
    var pagePath = '/pages/cart/index';
    app.turnToPage(pagePath, true);
  },

  // 勾选不同规格的商品
  selectSubModel: function(e){
    var dataset = e.target.dataset,
        // 规格id
        modelIndex = dataset.modelIndex,
        // 规格值id
        submodelIndex = dataset.submodelIndex,
        data = {},
        // 选择的规格
        selectModels = this.data.selectModelInfo.models,
        // 所有的规格
        model = this.data.goodsInfo.model,
        text = '';

    for(var item of model){
      if(item.value == modelIndex){
        for (var i in item.subModelName){
          if (i == submodelIndex){
            selectModels[modelIndex] = { value :i, name: item.subModelName[i]}
          }
        }
      }
    }
    console.log(selectModels);
    // 拼已选中规格文字
    for (var i in selectModels) {
      // console.log(i)
      text += selectModels[i].name + ' + '
    }
    text = text.substr(0, text.length - 3);  
    data['selectModelInfo.models'] = selectModels;
    data['selectModelInfo.models_text'] = text;

    this.setData(data);
    // 如果规格都选上了，更新价格可库存
    // console.log(Object.getOwnPropertyNames(selectModels).length)
    if (Object.getOwnPropertyNames(selectModels).length == this.data.goodsInfo.model.length){
      // console.log('jisuanjiage')
      this.resetSelectCountPrice();
    }
    
  },
  // 更新价格和库存
  resetSelectCountPrice: function(){
    var selectModelIds = [],
      selectModels = this.data.selectModelInfo.models,
      modelItems = this.data.goodsData.spec,
        data = {};
    // 多规格的将数组排序后再生成字符串进行比较就可以了
    for (var i in selectModels){
      selectModelIds.push(Number(selectModels[i]['value']))
    }
    selectModelIds = (selectModelIds.sort()).join(',')
    console.log(selectModelIds)
    for (var i in modelItems){
      console.log((modelItems[i].s_v_ids.split(',').sort()).join(','))
      if ((modelItems[i].s_v_ids.split(',').sort()).join(',') == selectModelIds){
        data['selectModelInfo.stock'] = modelItems[i].store;
        data['selectModelInfo.price'] = modelItems[i].price;
        data['selectModelInfo.modelId'] = modelItems[i].id;
        data['selectModelInfo.imgurl'] = app.globalData.imgHost + modelItems[i].image;
      }
    }
    this.setData(data);
  },

  // 数量的input框
  inputBuyCount: function(e){
    var count = +e.detail.value,
        selectModelInfo = this.data.selectModelInfo,
        goodsInfo = this.data.goodsInfo,
        stock = +selectModelInfo.stock;

    if(count >= stock) {
      count = stock;
      app.showModal({content: '购买数量不能大于库存'});
    }
    this.setData({
      'selectModelInfo.buyCount': +count
    });
  },
  // 点击显示预览大图
  clickPlusImages: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: e.currentTarget.dataset.srcarr
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    var that = this;
    that.setData({shareShow: false})
    return {
      title: that.data.goodsInfo.title,
      path: '/pages/goodsDetail/goodsDetail?id=' + that.data.goodsId,//路径
      success: function (res) {
        // 转发成功
        that.setData({ shareShow: true })
      },
      fail: function (res) {
        // 转发失败
        that.setData({ shareShow: true })
      }
    }
  }
})