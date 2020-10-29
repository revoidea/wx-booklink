// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      //当设置成Strng时，然后再setData，会触发无限递归的调用，无限循环直至内存耗光（内存泄漏）
      type:Number, 
      //这个函数重要，是对变量的值做处理
      observer:function(newVal,oldVal,changedPath){
        let val = newVal <10?'0'+newVal:newVal
        this.setData({
          _index:val
        })
      }
    }
  },

  //wxs(很重要)

  /**
   * 组件的初始数据
   */
  data: {
    months:[
      '一月','二月','三月','四月','五月','六月','七月','八月','九月',
      '十月','十一月','十二月'
    ],
    year:0,
    month:'',
    _index:''

  },

  attached:function(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year:year,
      month:this.data.months[month]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
