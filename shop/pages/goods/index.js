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
    "goods": [
      {
        "url": "../goodsDetail/goodsDetail?id=1",
        "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
        "about": "玲珑",
        "name": "独处盒子 体验装",
        "price": "118.00"
      },
      {
        "url": "../goodsDetail/goodsDetail?id=2",
        "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
        "about": "玲珑",
        "name": "独处盒子 体验装",
        "price": "118.00"
      },
      {
        "url": "../goodsDetail/goodsDetail?id=3",
        "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
        "about": "玲珑",
        "name": "独处盒子 体验装",
        "price": "118.00"
      },
      {
        "url": "../goodsDetail/goodsDetail?id=4",
        "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
        "about": "玲珑",
        "name": "独处盒子 体验装",
        "price": "118.00"
      },
      {
        "url": "../goodsDetail/goodsDetail?id=5",
        "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
        "about": "玲珑",
        "name": "独处盒子 体验装",
        "price": "118.00"
      },
      {
        "url": "../goodsDetail/goodsDetail?id=6",
        "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
        "about": "玲珑",
        "name": "独处盒子 体验装",
        "price": "118.00"
      },
    ]
  },
  onLoad: function () {
    // 根据进来传递的参数来设置页面标题
    wx.setNavigationBarTitle({
      title: '所有商品列表'
    })
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
    // 请求

    // 更新数据
    var newArr = [
      {
        "url": "../goodsDetail/goodsDetail?id="+(this.data.goods.length+1),
        "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
        "about": "玲珑",
        "name": "独处盒子 体验装",
        "price": "118.00"
      },
      {
        "url": "../goodsDetail/goodsDetail?id="+(this.data.goods.length + 2),
        "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
        "about": "玲珑",
        "name": "独处盒子 体验装",
        "price": "118.00"
      },
      {
        "url": "../goodsDetail/goodsDetail?id=" + (this.data.goods.length + 3),
        "image": "http://imgcdn.guoku.com/images/310/15d1670caa233632626f4e4d5c6c33b2.jpg",
        "about": "玲珑",
        "name": "独处盒子 体验装",
        "price": "118.00"
      },
    ]
    this.setData({ "goods": this.data.goods.concat(newArr) });
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
    }

    // 更新商品数据
    // 模拟 打乱数组
    this.setData({ "goods": this.data.goods.sort(this.randomSort) })
  },
  /**
   * 随机打乱数组
   * var arr = [1, 2, 3, 4, 5];
   * arr.sort(randomsort);
   */
  randomSort: function (a, b) {
    return Math.random() > .5 ? -1 : 1;
  }
})
