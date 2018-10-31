// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
    seven: "",
    create: false,
  },
  liebiao: function(e) {
    wx.navigateTo({
      url: '/pages/myList/myList'
    })
  },
  shuoming: function() {
    wx.navigateTo({
      url: '/pages/shuoming/shuoming'
    })
  },
  bindKeyInput: function(e) {
    var inputValue = e.detail.value;
    var key = e.target.dataset.index;
    if(key == 'one'){
      this.setData({ one: inputValue })
    }
    if (key == 'two') {
      this.setData({ two: inputValue })
    }
    if (key == 'three') {
      this.setData({ three: inputValue })
    }
    if (key == 'four') {
      this.setData({ four: inputValue })
    }
    if (key == 'five') {
      this.setData({ five: inputValue })
    }
    if (key == 'six') {
      this.setData({ six: inputValue })
    }
    if (key == 'seven') {
      this.setData({ seven: inputValue })
    }
    // 如果create=true 每次改动都将数据上传一下，用来保存用户更改过的数据(属于操作不当，可以先不搞)
  },
  generate: function(e) {
    var that = this;
    // 如果没有获取openID 则wx.login获取openid  

    var event = e.target.dataset.event
    // 如果是重新生成事件则清空值，用来重新生成 event="renew" 
    if(event == "renew"){
      that.setData({
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
        six: "",
        seven: "",
      })
    }
    // 生成和分享不用管，无影响  create=true event="generate"

    console.log(e.target.dataset.event)
    
    // 随机打乱数组
    function randomsort(a, b) {
      return Math.random() > .5 ? -1 : 1;
    }
    var red = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18",
    "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33"];
    var blue = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
    var oneRan = false, twoRan = false, threeRan = false, fourRan = false, fiveRan = false, sixRan = false, sevenRan = false;
    var temp = setInterval(function(){
      red.sort(randomsort);
      blue.sort(randomsort);
      var data = that.data;
      
      if(!data.one || oneRan){
        that.setData({ one: red[1] })
        oneRan = true
      }
      if (!data.two || twoRan) {
        that.setData({ two: red[2] })
        twoRan = true
      }
      if (!data.three || threeRan) {
        that.setData({ three: red[3] })
        threeRan = true
      }
      if (!data.four || fourRan) {
        that.setData({ four: red[4] })
        fourRan = true
      }
      if (!data.five || fiveRan) {
        that.setData({ five: red[5] })
        fiveRan = true
      }
      if (!data.six || sixRan) {
        that.setData({ six: red[6] })
        sixRan = true
      }
      if (!data.seven || sevenRan) {
        that.setData({ seven: blue[1] })
        sevenRan = true
      }
      that.setData({ create : true})
    }, 30)
    setTimeout(function(){
      clearInterval(temp)
    },2000)
    // 保存随机的号码
    
  },
  /**
   * 获取formId 用来发送模版消息  
   */
  formSubmit:function(e){
    var temp = e.detail.formId
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(temp)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户分享
   */
  onShareAppMessage: function (res) {
    // 记录用户分享的号码，获取比拼组ID    


    return {
      title: '自定义转发标题',
      path: '/pages/main?id=123',
      imageUrl: "https://www.bunao.win/images/my.jpg"
    }
  }
})