// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object,
    showLike:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      const bid = this.properties.book.id
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`,
      })

      /**
       * 在组件中写跳转的缺点：
       * 降低了组件的通用性
       * 这种方式的优点是非常方便
       * 服务于当前的项目   项目组件，可以在组件里写一些具体的业务
       * 如果是通用型组件  不建议在组件里写一些具体的业务 ，可以通过监听事件的方式
       * 
       */
    }
  }
})
