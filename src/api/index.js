/**
 * 首页和登录
 */
import Axios from 'axios'
import qs from 'qs'

const baseUrl = 'http://154.8.201.198:8081'
// const baseUrl = 'http://localhost:8080'
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

// 获取列表
export function recruitmentInfo (data) {
  return Axios.get(baseUrl + '/edu/recruitment/recruitmentInfo?'+data)
}
//获取用户信息
export function getUserInfoByTicket (data) {
  return Axios.post(baseUrl + '/edu/interface/getUserInfoByTicket',qs.stringify(data))
}


