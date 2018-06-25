
var app = getApp()

Page({
  data: {
    // 是否是编辑状态
    editing: false,
    goodsCount: 0,
    // 商品总价格
    goodsCountToPay: 0,
    // 支付总价格
    priceToPay: 0.00,
    // 商品列表
    goodsList: [
      // {
        // 商品id
        // id:1,
        // selected:true,
        // editSelected:true,
        // cover:"https://image.octmami.com/public/images/7e/ee/65/9293f477b8edac2b6958b5ee9401184bd09bc555.jpg",
        // title:"测试商品",
        // model_value_str:"测试",
        // price:198,
        // num:5,
      // },
    ],
    // 是否选中所有
    selectAll: true,
    // 编辑状态下选中所有
    editSelectAll: false,

  },
  isFromUserCenterEle: '',
  onLoad: function(options){
    // 进入购物车页面，取消红点
    wx.removeTabBarBadge({ index: 1 });
    // 获取购物车商品数据
    this.getShoppingCartData();
  },
  onShow: function(){
    // 进入购物车页面，取消红点
    wx.removeTabBarBadge({ index: 1 });
    // 获取购物车商品数据
    this.getShoppingCartData();
  },
  // 获取购物车商品
  getShoppingCartData: function(){
    var that = this;
    var cartDatas = [];
    if (wx.getStorageSync('xcx_cart_datas')){
      cartDatas = wx.getStorageSync('xcx_cart_datas');
    }
    
    for(var key in cartDatas){
      cartDatas[key]['selected'] = true;
      cartDatas[key]['editSelected'] = true;
      if (cartDatas[key]['title'].length > 8){
        cartDatas[key]['title'] = cartDatas[key]['title'].substr(0, 8)+'...';
      }
      
    }
    that.setData({ goodsList:cartDatas});
    // 重新计算勾选价格
    this.recalculateCountPrice();
  },
  // 编辑按钮
  switchToEdit: function(){
    this.setData({
      editing: true
    })
  },
  // 完成按钮
  editComplete: function(){
    var list = this.data.goodsList;

    for (var i = list.length - 1; i >= 0; i--) {
      list[i].editSelected = false;
    }

    this.setData({
      editing: false,
      goodsList: list
    })
    // 重新计算勾选价格
    this.recalculateCountPrice();
  },
  // 全选
  clickSelectAll: function(){
    var alreadySelect = this.data.selectAll,
        list = this.data.goodsList;

    if(alreadySelect){
      for (var i = list.length - 1; i >= 0; i--) {
        list[i].selected = false;
      }
    } else {
      for (var i = list.length - 1; i >= 0; i--) {
        list[i].selected = true;
      }
    }
    this.setData({
      selectAll: !alreadySelect,
      goodsList: list
    })
    this.recalculateCountPrice();
  },
  // 提交订单前的检查
  getTostoreNotBusinessTime: function (payIdArr , sucfn){
    var that = this;
    //模拟执行
    sucfn();
  },
  // 编辑状态的全选
  clickEditSelectAll: function(){
    var alreadySelect = this.data.editSelectAll,
        list = this.data.goodsList;

    if(alreadySelect){
      for (var i = list.length - 1; i >= 0; i--) {
        list[i].editSelected = false;
      };
    } else {
      for (var i = list.length - 1; i >= 0; i--) {
        list[i].editSelected = true;
      };
    }

    this.setData({
      editSelectAll: !alreadySelect,
      goodsList: list
    })
  },
  // 点击勾选商品按钮
  clickSelectGoods: function(e){
    var index = e.currentTarget.dataset.index,
        list = this.data.goodsList,
        selectAll = true;
    // console.log(index, list)
    for (var i = list.length - 1; i >= 0; i--) {
      if (list[i].id == index){
        list[i].selected = !list[i].selected;
      }
      
      if(!list[i].selected){
        selectAll = false;
        // break;
      }
    }
    this.setData({
      goodsList: list,
      selectAll: selectAll
    })
    this.recalculateCountPrice();
  },
  // 编辑时点击勾选商品按钮
  clickEditSelectGoods: function(e){
    var index = e.currentTarget.dataset.index,
        list = this.data.goodsList,
        editSelectAll = true;
    for (var i = list.length - 1; i >= 0; i--) {
      console.log(list[i].id,index)
      if (list[i].id == index) {
        list[i].editSelected = !list[i].editSelected;
      }
      if(!list[i].editSelected){
        editSelectAll = false;
        // break;
      }
    }
    this.setData({
      goodsList: list,
      editSelectAll: editSelectAll
    })
  },
  // 重新计算勾选的价格
  recalculateCountPrice: function(){
    var list = this.data.goodsList,
        totalCount = 0,
        price = 0;

    for (var i = list.length - 1; i >= 0; i--) {
      var goods = list[i];
      if(goods.selected){
        totalCount += +goods.num;
        price += +goods.price * +goods.num;
      }
    }

    this.setData({
      goodsCountToPay: totalCount,
      priceToPay: price.toFixed(2)
    })
  },
  // 删除商品
  deleteGoods: function(){
    var deleteIdArr = [],
      listExcludeDelete = [],
      list = this.data.goodsList,
      that = this;

    for (var i = list.length - 1; i >= 0; i--) {
      if(list[i].editSelected){
        deleteIdArr.push(+list[i].id);
      } else {
        listExcludeDelete.push(list[i]);
      }
    }
    if(!deleteIdArr.length) { return; }
    // 本地存储删除  
    wx.setStorageSync('xcx_cart_datas', listExcludeDelete);
    
    that.setData({
      goodsList: listExcludeDelete,
      goodsCount: listExcludeDelete.length
    })
  },
  // 结算
  goToPay: function(e){
    var payGoodsArr = [],
        list = this.data.goodsList,
        cartIdArray = [],
        that = this;

    for (var i = list.length - 1; i >= 0; i--) {
      var li = list[i];
      if(li.selected){
        cartIdArray.push(li.id);
        payGoodsArr.push(li);
      }
    }

    if (!payGoodsArr.length) {
      app.showModal({
        content: '请选择结算的商品'
      });
      return;
    }
    app.globalData.goodsList = payGoodsArr;
    // 跳转到结算页
    that.getTostoreNotBusinessTime(payGoodsArr , function() {
        var pagePath = '/pages/previewGoodsOrder/previewGoodsOrder?type='+'cart';
        app.turnToPage(pagePath);
    });


  },
  // 减少按钮
  clickMinusButton: function(e){
    var index = e.currentTarget.dataset.index,
      list = this.data.goodsList,
      num = null,
      deleteId = index,
      that = this;
    for (var i = list.length - 1; i >= 0; i--) {

      if (list[i].id == index) {
        num = list[i].num;
        if (num - 1 <= 0) {
          app.showModal({
            content: '确定从购物车删除该商品？',
            showCancel: true,
            confirm: function () {
              // 本地存储更新
              list.splice(i,1)
              console.log(list, 1, that)
              wx.setStorageSync('xcx_cart_datas', list);
              that.setData({goodsList: list})
              that.recalculateCountPrice()
            }
          })
          return;
        }
      }
    }
    
    this.changeGoodsNum(index, 'minus');
  },
  // 增加按钮
  clickPlusButton: function(e){
    var index = e.currentTarget.dataset.index;
    this.changeGoodsNum(index, 'plus');
  },
  // 改变数量
  changeGoodsNum: function(index, type){
    var list = this.data.goodsList;
    var goods = null;
    for (var i = list.length - 1; i >= 0; i--) {
      if (list[i].id == index) {
        goods = list[i];
        goods.num = type == 'plus' ? goods.num + 1 : goods.num - 1
      }
    }
    console.log(goods, index)

    // 没传库存，先不用管，暂时不重要
    // if (goods.num > goods.stock ){
    //   app.showModal({
    //     content: '库存不足'
    //   });
    //   return;
    // }
    this.setData({ goodsList: list});
    // 本地存储更新
    wx.setStorageSync('xcx_cart_datas', list);
    this.recalculateCountPrice();
  },
  inputGoodsCount: function(e){
    let index = e.target.dataset.index,
        count = e.detail.value,
        franchiseeId = this.franchiseeId,
        data = {},
        that = this,
        goods = this.data.goodsList[index],
        param = {
          goods_id: goods.goods_id,
          model_id: goods.model_id || '',
          num: count,
          sub_shop_app_id: this.franchiseeId,
          is_seckill: goods.is_seckill == 1 ? 1 : ''
        };
    if (count == '') {
      return;
    }
    if (count == 0) {
      app.showModal({
        content: '请输入大于0的数字',
      })
      return;
    }
    app.sendRequest({
      url: '/index.php?r=AppShop/addCart',
      data: param,
      success: function (res) {
        data = {};
        data['goodsList[' + index + '].num'] = count;
        that.setData(data);
        that.recalculateCountPrice();
      },
      successStatusAbnormal: function (res) {
        app.showModal({
          content: res.data
        })
      }
    })
  }
})
