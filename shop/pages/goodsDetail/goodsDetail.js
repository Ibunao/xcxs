var app = getApp()
Page({
  data: {
    // 商品id
    goodsId: '2',
    goodsInfo: {
      goods_type:0,//no
      // 图片数组 false表示没有
      img_urls:[
        "https://image.octmami.com/public/images/7e/ee/65/9293f477b8edac2b6958b5ee9401184bd09bc555.jpg",
        "https://image.octmami.com/public/images/d2/98/42/3a589c8aaddbb509addb0ec2f4c048f3e7e8085c.jpg",
        "https://image.octmami.com/public/images/7e/ee/65/9293f477b8edac2b6958b5ee9401184bd09bc555.jpg",
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
    },
    // 商品参数
    goodsParams:[
      {name:"重量", value:"10kg"},
      { name: "重量", value: "10kg" },
      { name: "重量", value: "10kg" },
      { name: "重量", value: "10kg" },
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
        "http://image.octmami.com/public/images/7b/c8/3b/b7052d99fdd90a87a25b1411ec80e6aa92edacc8.png?1458724526#w",
        "http://image.octmami.com/public/images/d7/27/da/0ebf90856b3864f27e4640edf5f39138ef349251.png?1458724540#w",
        "http://image.octmami.com/public/images/09/49/7e/1873d54fb478cb58c2fb53254ff2e8bbacdf0d8d.png?1458724572#w",
      ]
    },
    // 选择商品的详情，加入购物车或者立即购买使用
    selectModelInfo: {
      // 图片地址
      imgurl: "https://image.octmami.com/public/images/7e/ee/65/9293f477b8edac2b6958b5ee9401184bd09bc555.jpg",
      title: '商品名',
      price: '10',
      buyCount: 1,
      // 库存
      stock: 10,
      // 已选
      models_text : '测试'
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
    var that = this,
      param = {
        goods_id: this.data.goodsId,
        num: this.data.selectModelInfo.buyCount,
      };
    // 发送添加到购物车的请求
    // app.sendRequest({
    //   hideLoading: true,
    //   url: '/index.php?r=AppShop/addCart',
    //   data: param,
    //   success: function (res) {
    //     app.showToast({
    //       title: '添加成功',
    //       icon: 'success'
    //     });

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
    // 发送请求，跳转结算页面 previewGoodsOrder
    
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
    var goodsId = options.detail,
        contact = options.contact || '',
        franchiseeId = options.franchisee || '',
        cartGoodsNum = options.cart_num || 0,
        defaultPhoto = "",
        goodsType = options.goodsType || 0,
        userToken = options.user_token || '',
        hidestock = options.hidestock || '',
        isShowVirtualPrice = options.isShowVirtualPrice || '';
    // this.setData({
    //   goodsId: goodsId,
    //   contact: contact,
    //   defaultPhoto: defaultPhoto,
    //   franchiseeId: franchiseeId,
    //   cartGoodsNum: cartGoodsNum,
    //   goodsType : goodsType,
    //   isSeckill : goodsType == 'seckill' ? true : false,
    //   hidestock : hidestock == 'true' ? true : false,
    //   isShowVirtualPrice: isShowVirtualPrice == 'true' ? true : false,
    // })
    // this.dataInitial();

  },
  // 初始化数据
  dataInitial: function () {
    var that = this;
    app.sendRequest({
      url: '/index.php?r=AppShop/getGoods',
      data: {
        data_id: this.data.goodsId,
        sub_shop_app_id: this.data.franchiseeId ,
        is_seckill: this.data.isSeckill ? 1 : ''
      },
      success: function(){},
      complete: function(){
        that.setData({
          page_hidden: false
        })
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
        modelIndex = dataset.modelIndex,
        submodelIndex = dataset.submodelIndex,
        data = {},
        selectModels = this.data.selectModelInfo.models,
        model = this.data.goodsInfo.model,
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
    data['selectModelInfo.models'] = selectModels;
    data['selectModelInfo.models_text'] = text;

    this.setData(data);
    this.resetSelectCountPrice();
  },
  // 更新价格
  resetSelectCountPrice: function(){
    var _this = this,
        selectModelIds = this.data.selectModelInfo.models.join(','),
        modelItems = this.data.goodsInfo.model_items,
        data = {};

    for (var i = modelItems.length - 1; i >= 0; i--) {
      if(modelItems[i].model == selectModelIds){
        if(_this.data.isSeckill){  //假如是秒杀
          data['selectModelInfo.stock'] = modelItems[i].seckill_stock;
          data['selectModelInfo.price'] = modelItems[i].seckill_price;
          data['selectModelInfo.modelId'] = modelItems[i].id;
          data['selectModelInfo.imgurl'] = modelItems[i].img_url;
        }else{
          data['selectModelInfo.stock'] = modelItems[i].stock;
          data['selectModelInfo.price'] = modelItems[i].price;
          data['selectModelInfo.modelId'] = modelItems[i].id;
          data['selectModelInfo.imgurl'] = modelItems[i].img_url;
          data['selectModelInfo.virtualPrice'] = modelItems[i].virtual_price;
        }
        break;
      }
    }
    this.setData(data);
  },

  // 数量的input框 暂时没用
  inputBuyCount: function(e){
    var count = +e.detail.value,
        selectModelInfo = this.data.selectModelInfo,
        goodsInfo = this.data.goodsInfo,
        stock = +selectModelInfo.stock;

    if(count >= stock) {
      count = stock;
      app.showModal({content: '购买数量不能大于库存'});
    }
    if(this.data.isSeckill && count >= +goodsInfo.seckill_buy_limit){
      count = goodsInfo.seckill_buy_limit;
      app.showModal({content: '购买数量不能大于秒杀限购数量'});
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',//路径
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
