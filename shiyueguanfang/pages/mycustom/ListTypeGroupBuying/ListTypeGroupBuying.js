// pages/mycustom/ListTypeCroupBuying/ListTypeCroupBuying.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemList: {
      type: Object,
      value: {},
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    listArray: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //设置数据源
    setList(itemList) {
      //  console.log("setList === " + itemList);
      this.setData({
        listArray: itemList
      });
    },
    //点击每个item的事件
    clickItem(e) {
      var detailData = e.currentTarget.dataset.detail;
      console.log("coustom data === " + detailData);
      let myEventOption = {
        bubbles: false,//事件是否冒泡
        composed: false,//事件是否可以穿越组件边界
        capturePhase: false //事件是否拥有捕获阶段
      }
      //官方解释triggerEvent：自定义组件触发事件时，需要使用 triggerEvent 方法，指定事件名、detail对象和事件选项
      // 触发事件的选项,第一个字符串（detail）是用于使用该自定义控件时候，绑定时间的时候使用：例如(demo.wxml中的 binddetail="bindtap" ，bind加上此字符串detail组成关键字)，第二个detailData变量是所需要传的数据，第三个参数是事件传递的设置

      this.triggerEvent('detailData', detailData, myEventOption)
    },



  }
})
