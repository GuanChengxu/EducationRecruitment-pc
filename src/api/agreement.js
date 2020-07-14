/**
 * 开始报名
 */
import Axios from 'axios'
import qs from 'qs'

const baseUrl = 'https://ystwx.yantai.gov.cn/jneduapi2'
// const baseUrl = 'http://localhost:8080'
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}
startApplyOrQuery
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


