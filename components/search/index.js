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
      observer:'loadMore' //自定义监听函数
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
    loading:false,
    loadingCenter:false
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
    loadMore(){
      if(!this.data.q){
        return
      }
      if(this.isLocked()){
        return 
      }
      //用户操作过快，会导致同时发送多个请求，导致数据出现重复
      //解决：使用锁 一次只发送一个请求
      // const length = this.data.dataArray.length
      if(this.hasMore()){
        //设置上锁
        this.locked()
        bookModel.search(this.getCurrentStart(),this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            //解锁
            this.unLocked()
          },() => {
            //网络断网，接口请求失败，也需要解锁，避免造成死锁
            this.unLocked()
          })
      }
    },
    onCancel(event){
      this.initialize()
      this.triggerEvent('cancel',{},{})
    },
    onDelete(event){
      this.initialize()
      this._closeResult()
    },
    onConfirm(event){
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      this.setData({
        q:q
      })
      bookModel.search(0,q).then( res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    },
    _showResult(){
      this.setData({
        searching:true
      })
    },
    _closeResult(){
      this.setData({
        searching:false,
        q:''
      })
    },
    
  }
})
