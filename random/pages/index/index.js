//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabIndex: 2,
    shareList:[
      {
        date: "2018-12-32",
        qishu: "20180930",
        jieguo: "未开奖",
        items:[
          {
            img:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoHZkDvnuY17Rksiatk1AX5htF7wZYAibcPyib1cibd7wLO2GYthwTsADIibzjia19Ou77oddS40UvLukYg/132',
            name:"1**0",
            borderStyle: 1,
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
            img: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoHZkDvnuY17Rksiatk1AX5htF7wZYAibcPyib1cibd7wLO2GYthwTsADIibzjia19Ou77oddS40UvLukYg/132',
            name: "100-20",
            borderStyle: 2,
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
    ],
    helpList:[
      // {
      //   img:'',
      //   name:'100-20',
      //   balls:[
      //     "01",
      //     "01",
      //     "01",
      //     "01",
      //     "01",
      //     "01",
      //     "01",
      //   ],
      //   date: "2018-10-32 10:20:30",
      //   qishu: "第 20185636 期",
      //   msg:"老铁，帮我买"
      // }
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
  onLoad: function (query) {
    console.log(query)
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    // 根据分享类型的不同
    if(query.type){
      if(!userInfo){
        wx.showModal({
          title: '提示',
          content: '首次使用需要生成一次自己的幸运码',
          success(res) {
            if (res.confirm) {
              
            } else if (res.cancel) {
              
            }
            wx.switchTab({
              url: '/pages/main/main'
            })
          }
        })
        return
      }
      var route = '';
      if(query.type == 'm'){
        route = 'info/bangmai';
      }else{
        route = 'info/bibi';
      }
      wx.request({
        url: app.globalData.host + route,
        data: {
          ballId: query.ballId,
          openid: userInfo['openid']
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.code == 200) {
            that.setData({ helpList: res.data.data })
          } else {
            wx.showToast({
              title: '发生错误，请联系客服',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      // wx.showModal({
      //   title: '提示',
      //   content: query.type,
      //   success(res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
    }else{
      var that = this
      var openid = ''
      if (userInfo) {
        openid = userInfo['openid']
      }
      wx.request({
        url: app.globalData.host + 'info/bangmai-list',
        data: {
          openid: openid,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.code == 200) {
            that.setData({ helpList: res.data.data })
          }
        },
        fail() {
          wx.showToast({
            title: '发生错误，请联系客服',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    
    return {
      title: '你有一笔存款待领取',
      path: '/pages/main/main',
      imageUrl: "https://api.wuxingxiangsheng.com/images/share.png"
    }
  }
})
