
var app = getApp()

Page({
  data: {
    // 选择的地址id
    selectAddressId: '',
    addressList: [
      {
        id:10,
        name:"简称",
        detailAddress:"详细地址",
        username:"收件人",
        contact:"18234757591"
      }
    ],
    from:"",
  },
  onLoad: function(options){
    var that = this,
        selectAddressId = options.id || '';
    this.setData({
      selectAddressId: selectAddressId,
    })
    // 获取用户地址列表
    this.getAddressList(selectAddressId)
  },
  onShow: function(){

  },
  // 获取用户的地址列表
  getAddressList: function (selectAddressId){
    let that = this;
    let addressList = [];
    let hasInDistance = true;
    // app.sendRequest({
    //   url: '/index.php?r=AppShop/addressList',
    //   success: function(res){
    //     let address = res.data;
    //     for(var i = 0, j = address.length-1 ; i <= j; i++){
    //       if (from == 'previewtakeout') {
    //         address[i].is_distance = app.calculationDistanceByLatLng(shopInfo.latitude, shopInfo.longitude, address[i].latitude, address[i].longitude) < shopInfo.deliver_distance ? 1 : 0;
    //       }
    //       if (address[i].is_distance == 0) {
    //         hasInDistance = false;
    //       }
    //       addressList.push(address[i]);
    //     }
    //     if (selectAddressId || orderId || from) {
    //       that.setData({
    //         addressList: addressList,
    //         selectAddressId: selectAddressId,
    //         orderId: orderId,
    //           from: from,
    //           hasInDistance: hasInDistance
    //       })
    //     }else{
    //       that.setData({
    //         addressList: addressList,
    //         hasInDistance: hasInDistance
    //       })
    //     }
    //   }
    // })
  },
  // 删除用户地址
  deleteAddress: function(e){
    var that = this,
        deleteId = e.target.dataset.id;

    app.showModal({
      content: '确定要删除地址？',
      showCancel: true,
      confirmText: '确定',
      cancelText: '取消',
      confirm: function(){
        app.sendRequest({
          url: '/index.php?r=AppShop/delAddress',
          data: {
            address_id: deleteId
          },
          success: function(res){
            var addressList = that.data.addressList;

            for (var i = 0; i <= addressList.length - 1; i++) {
              if(addressList[i].id == deleteId){
                addressList.splice(i, 1);
              }
            }
            that.setData({
              addressList: addressList
            })
          } 
        })
      }
    })
  },
  // 添加新地址
  addNewAddress:function(){
    let _this = this;
    app.turnToPage('/pages/addAddress/addAddress');
  },
  // 选择地址
  selectAddress: function(e){
    var addressId = e.currentTarget.dataset.id,
        that = this,
        addressList = this.data.addressList;

    this.setData({
      selectAddressId: addressId
    })

    // if(orderId){
    //   // 修改订单详情地址
    //   app.sendRequest({
    //     url: '/index.php?r=AppShop/setAddress',
    //     data: {
    //       order_id: orderId,
    //       address_id: addressId,
    //       sub_shop_app_id: that.subShopId
    //     },
    //     success: function(res){
    //       that.changeFreightWay();
    //     }
    //   });

    // } else {

      
      // 修改结算页面地址
      for (var i = addressList.length - 1; i >= 0; i--) {
        if(addressList[i].id == addressId){
          prePage.setData({
            selectAddress: addressList[i]
          });
          typeof prePage.selectAddressCallback === 'function' && prePage.selectAddressCallback(addressList[i]);
        }
      };
      app.turnBack();
    // }
  },
  // 编辑地址
  editAddress: function(e){
    let addressId = e.currentTarget.dataset.id;
    // app.sendRequest({
    //   url: '/index.php?r=AppShop/GetAddressById',
    //   data: {
    //     address_id: e.currentTarget.dataset.id,
    //   },
    //   success: function (res) {
    //     _this.setData({
    //       address_id: e.currentTarget.dataset.id,
    //       showNewAddressDialog: false,
    //       address_info: res.data.address_info
    //     })
    //   }
    // });
    app.turnToPage('/eCommerce/pages/addAddress/addAddress?id='+addressId);
  }
})
