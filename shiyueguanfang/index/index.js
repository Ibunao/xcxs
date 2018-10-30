var app = getApp()
Page({
  data: {
    path: app.globalData.base_api_add_groupon,
  },
  onLoad: function (options) {
    console.log(options)
    if(options.page){
      var path = this.data.path += options.page+'?'
      delete options.page
      for(var attr in options){
        path += attr + '=' + options[attr] + '&'
      }

      this.setData({
        path: path
      })
    }
    console.log(path)
  }

})
