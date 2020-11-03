const paginationBeh = Behavior({
  data:{
    dataArray:[],
    total:null
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

    },
    //设置total
    setTotal(total){
      if(this.data.dataArray.length >= this.data.total){
        return false
      }
      else{
        return true
      }
    },
    initialize(){
      this.data.dataArray = []
      this.data.total = null
    }
  }
})

export { paginationBeh }