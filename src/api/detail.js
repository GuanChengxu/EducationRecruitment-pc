/**
 * 招生简章
 */
import Axios from 'axios'
import qs from 'qs'

const baseUrl = 'http://154.8.201.198:8081'
// const baseUrl = 'http://localhost:8080'
// 获取招生简章
export function recruitmentById (data) {
  return Axios.get(baseUrl + '/edu/recruitment/recruitmentById/'+data)
}


