/**
 * 开始报名
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
// 报名查询
export function startApplyOrQuery (data) {
  return Axios.get(baseUrl + '/edu/recruitment/startApplyOrQuery?'+data)
}
// 下载文档
export function exportPDF (data) {
  return Axios.get(baseUrl + '/edu/recruitment/exportPDF?'+data)
}
//获取预览信息
export function queryTeacherInfo (data) {
  return Axios.get(baseUrl + '/edu/recruitment/queryTeacherInfo/'+data)
}
//获取支付码
export function getCode (data) {
  return Axios.get(baseUrl + '/edu/recruitment/getPayCode/'+data)
}


