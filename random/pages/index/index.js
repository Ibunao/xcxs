//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabIndex: 1,
    shareList:[
      {
        date: "2018-12-32",
        qishu: "20180930",
        jieguo: "未开奖",
        items:[
          {
            img:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoHZkDvnuY17Rksiatk1AX5htF7wZYAibcPyib1cibd7wLO2GYthwTsADIibzjia19Ou77oddS40UvLukYg/132',
            name:"1**0",
            balls:[
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
            ],
            result: "中10000元",
            open:false
          },
          {
            img: '',
            name: "100-20",
            balls: [
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
            ],
            result: "中10000元",
            open:false,
          }
        ]
      }, 
      {
        date: "2018-12-32",
        qishu: "20180930",
        jieguo: "未开奖",
        items: [
          {
            img: '',
            name: "100-20",
            balls: [
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
              "01",
            ],
            result: "中10000元",
            open:false
          }
        ]
      }
    ]
  },
  switchTab:function(e){
    var index = e.target.dataset.index
    this.setData({tabIndex: index})
  },
  /**
   * 切换下拉
   */
  xiala: function (e) {
    var switchIndex = e.target.dataset.index
    this.data.shareList[switchIndex].open = !this.data.shareList[switchIndex].open;
    this.setData({
      shareList: this.data.shareList
    })
  },
  onLoad: function () {
  },
})
