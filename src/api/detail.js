/**
 * 招生简章
 */
import Axios from 'axios'
import qs from 'qs'

const baseUrl = 'https://ystwx.yantai.gov.cn/jneduapi2'
// const baseUrl = 'http://localhost:8080'
// 获取招生简章
export function recruitmentById (data) {
  return Axios.get(baseUrl + '/edu/recruitment/recruitmentById/'+data)
}


