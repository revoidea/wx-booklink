import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hostList = bookModel.getHotList()
    hostList.then(res=> {
      this.setData({
        books:res
      })
    }
   )
  },

  onSearching(event){
    this.setData({
      searching:true
    })
  },

  onCancel(event){
    this.setData({
      searching:false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

  /*
   promise的基本使用
  promiseDemo:function(){
    //Promise 是对象 不是函数
    //对象可以保存状态， 函数不行，除了闭包
    //Promise 第一步
    //异步代码 写在 Promise的函数中  第二步
    const promise = new Promise((resolve,reject) => {
      //pending fulfilled rejected
      //进行中  已成功   已失败  （状态一旦被修改，就会凝固）
      wx.getSystemInfo({
        success: (res) => {
          resolve(res)
        },
        fail:(error) => {
          reject(error)
        }
      })
    })
    promise.then((res) => {
      console.log(res)
    },(error)=>{
      console.log(error)
    })
  }*/

  //Promise 链式调用的正确方式
  // promiseDemo2:function(){
  //   bookModel.getHotList()
  //   .then(res => {
  //     console.log(res)
  //     return bookModel.getMyBookCount()
  //   })
  //   .then(res=>{
  //     console.log(res)
  //     return bookModel.getMyBookCount()
  //   })
  //   .then(res=>{
  //     console.log(res)
  //   })
  // }
})