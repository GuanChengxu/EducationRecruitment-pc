/**
 * 开始报名
 */
import Axios from 'axios'
import qs from 'qs'

const baseUrl = 'http://192.168.31.68:8081'
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


