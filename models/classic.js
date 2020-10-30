import { HTTP }  from '../util/http.js'

class ClassicModel extends HTTP {
  getLatest(sCallback){
    this.request({
      url:'classic/latest',
      success:(res)=>{
        sCallback(res)
        this._setLatestIndex(res.index)
      }
    })
  }

  getClassic(index,nextOrPrevious,sCallback){
    //缓存中寻找 or API 写入到缓存中
    //key 确定Key
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({ 
        url:`classic/${index}/${nextOrPrevious}`,
        success:(res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    }else{
      sCallback(classic)
    }
  }

  isFirst(index){
    return index == 1 ? true : false
  }

  isLatest(index){
    let latestIndex = this._getLatesIndex()
    return latestIndex == index ? true : false
  }

  _setLatestIndex(index){
    //同步写入缓存（写入数据比较小的时候，建议用）
    wx.setStorageSync('latest', index)
    //异步缓存 wx.setStorage
  }

  _getLatesIndex(){
    let index =  wx.getStorageSync('latest')
    return index
  }

  _getKey(index){
    let key = `classic-${index}`
    return key
  }
}

export {ClassicModel}