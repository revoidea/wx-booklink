// components/like/index.js
Component({
  /**
   * 组件的属性列表（组件开发出去，可以在外面传值进来的属性）
   */
  properties: {
    like:{
      type:Boolean
    },
    count:{
      type:Number,
      value:0
    },
    readOnly:{
      type:Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //数据绑定
    //三元运算符
    //思考组件的封装性（哪些属性是需要封装在内，哪些属性是需要开放出去的）
    //思考组件的粒度：因为组件可以封装成简单的（具有灵活性），也可以封装成复杂的（具有实用性）
    yesSrc:'images/like.png',
    noSrc:'images/like_dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      //自定义事件
      /**
       * 第一步：想清楚自定义事件的目标
       *         1.发生变化时，通知页面
       *         2.并且携带一个状态
       */
      if(this.properties.readOnly){
        return
      }
      let like = this.properties.like
      let count = this.properties.count
      count = like? count-1 : count+1
      this.setData({
        count:count,
        like:!like
      })
      //激活
      let behavior = this.properties.like ? 'like' :'cancel'
      /**
       * 设置自定义事件的方法
       * 第一个参数：事件名称
       * 第二个参数：设置携带的参数
       * 第三个参数：一般不需要用到
       */
      this.triggerEvent('like',{
        behavior:behavior
      },{})
    }
  }
})
