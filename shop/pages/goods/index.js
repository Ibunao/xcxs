//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 首部导航数据
    "navTab":{
      "index": 1,
      "priceSort":0,
    },
    page: 1,// 页码
    options:'',// 保存传递过来的参数
    "goods": [
      // {
      //   "url": "../goodsDetail/goodsDetail?id=1",
      //   "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
      //   "about": "玲珑",
      //   "name": "独处盒子 体验装",
      //   "price": "118.00"
      // }
    ]
  },
  onLoad: function (option) {
    console.log(option)

    // 根据进来传递的参数来设置页面标题
    wx.setNavigationBarTitle({
      title: '所有商品列表'
    })
    this.data.options = option;
    this.getGoods(option);
  },
  // 自带 下拉事件 刷新
  onPullDownRefresh: function () {
    
  },
  // 自带 上拉触底 加载数据
  onReachBottom:function(){
    this.loadDatas();
  },
  // 上拉或下拉加载数据
  loadDatas: function(){
    // 显示正在加载动画
    wx.showNavigationBarLoading();
    this.data.options.page = ++this.data.page
    // 请求 
    this.getGoods(this.data.options);
    // 模拟两秒
    setTimeout(function () {
      // 停止下拉刷新
      wx.stopPullDownRefresh()
      // 结束正在加载动画
      wx.hideNavigationBarLoading();
    }, 2000);
  },
  switchNavTab:function (event) {
    var index = event.currentTarget.dataset.index;
    // console.log(this.data.navTab.index, index);
    this.setData({"navTab.index":index});
    // console.log(this.data.navTab.index);
    if(this.data.navTab.index == 1){
      var priceSort = (this.data.navTab.priceSort + 1)%3;
      this.setData({ "navTab.priceSort": priceSort})
      // 排序
      this.data.options.orderType = 'price';
      this.data.options.orderSort = priceSort;
      this.data.goods = [];
      this.getGoods(this.data.options)
    }
    if (this.data.navTab.index == 2){
      // 排序
      this.data.options.orderType = 'sales';
      this.data.goods = [];
      this.getGoods(this.data.options)
    }
    if (this.data.navTab.index == 3) {
      // 排序
      this.data.options.orderType = 'time';
      this.data.goods = [];
      this.getGoods(this.data.options)
    }
    // 更新商品数据
    // 模拟 打乱数组
    // this.setData({ "goods": this.data.goods.sort(this.randomSort) })
  },
  /**
   * 随机打乱数组
   * var arr = [1, 2, 3, 4, 5];
   * arr.sort(randomsort);
   */
  randomSort: function (a, b) {
    return Math.random() > .5 ? -1 : 1;
  },
  getGoods: function(datas) {
    var that = this;
    // datas.page = that.data.page++
    console.log(that.data.page)
    wx.request({
      url: app.globalData.host + '/goods/get-goods',
      data: datas,
      success: function (res) {
        console.log(res);
        // 存储openid
        if (res.data && res.data.length >1) {
          var resp = [];
          for(var i of res.data) {
            resp.push({
              "url": "../goodsDetail/goodsDetail?id=" + i.id,
              "image": app.globalData.imgHost+i.image,
              "price": i.wx_price,
              "name": i.name,
            })
          }
          that.setData({ 'goods': that.data.goods.concat(resp)})
        }else{
          app.showModal({content:'没有更多商品了'})
          if(that.page == 1){
            console.log(that.page)
            that.setData({ 'goods': [] })
          }
          
        }
      }
    })
  }
})
