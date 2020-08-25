/**
 * 首页和登录
 */
import Axios from 'axios'
import qs from 'qs'
import commen from '@/settings.js'

const baseUrl = commen.baseUrl;
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


