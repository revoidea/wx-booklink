import { HTTP }  from '../util/http.js'

class ClassicModel extends HTTP {
  getLatest(sCallBack){
    this.request({
      url:'classic/latest',
      success:(res)=>{
        sCallBack(res)
      }
    })
  }
}

export {ClassicModel}