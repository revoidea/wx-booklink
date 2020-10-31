import { config } from '../config.js'

//根据错误码，提供错误信息
const tips = {
  1:'抱歉，出现了一个错误',
  1005:'错误1',
  1006:'错误2'
}

class HTTP {
  request({url,data={},method="GET"}){
    return new Promise((resolve,reject) => {
      this._request({url,resolve,reject,data,method})
    })
  }
  _request({url,resolve,reject,data={},method="GET"}){
    //url data method
    wx.request({ //异步的
      url: config.api_base_url + url,
      method:method,
      header:{
        'content-type':'application/json',
        'appKey':config.appKey
      },
      data:data,
      success:(res) => {  //回调函数
        //startswith
        //endswith
        const code = res.statusCode.toString()
        if(code.startsWith('2')) {
          resolve(res.data)
        }
        else{ //服务器异常
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err) => {  //api调用失败
        reject()
        this._show_error(1)
      }

    })
  }

  //加下划线，表示私有方法，外部不建议调用
  _show_error(error_code){
    if(!error_code){
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon:'none',
      duration:2000
    })
  }
}

export { HTTP }