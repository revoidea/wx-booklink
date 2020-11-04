const paginationBeh = Behavior({
  data:{
    dataArray:[],
    total:null,
    noneResult:false,
    loading:false
  },
  methods:{
    setMoreData(dataArray){
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray:tempArray
      })
    },
    //起始记录数
    getCurrentStart(){
      return this.data.dataArray.length
    },
    //是否还有更多数据可以加载：可以解决向服务器发送无效请求的问题
    hasMore(){
      if(this.data.dataArray.length >= this.data.total){
        return false
      }
      else{
        return true
      }
    },
    //设置total
    setTotal(total){
      this.data.total = total
      if(total == 0){
        this.setData({
          noneResult:true
        })
      }
    },
    initialize(){
      this.setData({
        dataArray:[],
        noneResult:false,
        loading:false
      })
      this.data.total = null

    },
    //锁
    isLocked(){
      return this.data.loading?true:false
    },
    //加锁
    locked(){
      this.setData({
          loading:true
      })
    },
    unLocked(){
      this.setData({
        loading:false
      })
    }
  }
})

export { paginationBeh }