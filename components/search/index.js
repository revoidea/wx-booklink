// components/search/index.js
import { 
  KeywordModel 
} from '../../models/keyword.js'
import { 
  BookModel
} from '../../models/book.js'
import {
  paginationBeh
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors:[paginationBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
      observer:'_load_more' //自定义监听函数
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    q:'',
    loading:false
  },

  attached(){
    //const historyWords = keywordModel.getHistory()
    //const hotWords = keywordModel.getHot()
    this.setData({
      historyWords:keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords:res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _load_more(){
      if(!this.data.q){
        return
      }
      if(this.data.loading){
        return 
      }
      //用户操作过快，会导致同时发送多个请求，导致数据出现重复
      //解决：使用锁 一次只发送一个请求
      // const length = this.data.dataArray.length
      if(this.hasMore()){
        //设置上锁
        this.data.loading = true
        bookModel.search(this.getCurrentStart(),this.data.q).then(res => {
          this.setMoreData(res.books)
          this.data.loading = false//解锁
        })
      }
    },
    onCancel(event){
      this.triggerEvent('cancel',{},{})
    },
    onDelete(event){
      this.setData({
        searching:false
      })
    },
    onConfirm(event){
      this.setData({
        searching:true
      })
      this.initialize()
      const q = event.detail.value || event.detail.text
      bookModel.search(0,q).then( res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q:q
        })
        keywordModel.addToHistory(q)
      })
    },
  }
})
