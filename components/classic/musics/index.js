import { 
  classicBeh 
} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors:[classicBeh],
  /**
   * 组件的属性列表 ， 动画
   * 小程序提供了动画API
   * CSS3(建议用) canvas
   */
  properties: {
    src:String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  attached:function(){
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached:function(event){
    //组件切换时，并不会执行该函数（当通过使用hidden来进行组件的隐藏时）
    //wx:if hidden(理解二者的区别--重点)


  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event){
      // 图片切换
      /**
       * 如果当前没在播放音乐，则播放音乐
       * 如果当前在播放音乐，则停止播放
       */
      if(!this.data.playing){
        this.setData({
          playing:true
        })
        console.log(this.properties.src)
        mMgr.src=this.properties.src
        mMgr.title = this.properties.title
      }else{
        this.setData({
          playing:false
        })
        mMgr.pause()
      }
    },

    //更改音乐播放状态
    _recoverStatus:function(){
      if(mMgr.paused){
        this.setData({
          playing:false
        })
        return
      }
      if(mMgr.src == this.properties.src){
        this.setData({
          playing:true
        })
      }
    },
    
    _monitorSwitch:function(){
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
