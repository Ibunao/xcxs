
var app = getApp();
var baseUrl = app.globalData.base_api_add_groupon



function octRequestWithUrl(subUrl, title, succe, fail) {
  var requestUrl = baseUrl + subUrl;
  console.log("requestUrl === " + requestUrl);

  wx.showLoading({
    title: '正在加载'
  })

  wx.request({
    url: requestUrl,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res.data);
      wx.hideLoading();

      if(res.data.code){
        if (res.data.code == "200" || res.data.code == '304') {
          succe(res.data);
        } else if (res.data.code == "400") {
          console.log("error1");
          var msgStr = '没有更多数据！';
          if (res.data.msg.length > 0) {
            msgStr = res.data.msg;
          }
          fail(msgStr);
        } else if (res.data.code == "404") {
          console.log("error3");
          fail("网络请求错误！")
        }
      }else{
         succe(res.data);
      }
     

   


    },
    fail: function (err) {
      console.log("error2");
      wx.hideLoading();
      fail("网络请求错误！")
    }

  })
}



function octRequestWithUrlPost(subUrl, dataValue, succe, fail) {
  var requestUrl = baseUrl + subUrl;

  console.log("requestUrl === " + requestUrl);
  wx.showLoading({
    title: '正在加载'
  })

  console.log(dataValue);

  wx.request({
    url: requestUrl,
    method: 'POST',
    data: dataValue,
    // data: json2Form(dataValue),
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res.data);
      wx.hideLoading();
      if (res.data.code == "200" || res.data.code=='304') {
        succe(res.data);
      } else if (res.data.code == "400") {
        console.log("error1");
        var msgStr = '没有更多数据！';
        if (res.data.msg.length > 0) {
          msgStr = res.data.msg;
        }
        fail(msgStr);
      } else if (res.data.code == "404") {
        console.log("error3");
        fail("网络请求错误！")
      }


    },
    fail: function (err) {
      console.log("error2");
      wx.hideLoading();
      fail("网络请求错误！")
    }

  })
}


module.exports = {
  octRequestWithUrl: octRequestWithUrl,
  octRequestWithUrlPost: octRequestWithUrlPost,

}
