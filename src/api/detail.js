/**
 * 招生简章
 */
import Axios from 'axios'
import qs from 'qs'

const baseUrl = 'http://192.168.31.68:8081'
// 获取招生简章
export function recruitmentById (data) {
  return Axios.get(baseUrl + '/edu/recruitment/recruitmentById/'+data)
}


