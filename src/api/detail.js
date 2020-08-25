/**
 * 招生简章
 */
import Axios from 'axios'
import qs from 'qs'

import commen from '@/settings.js'

const baseUrl = commen.baseUrl;
// 获取招生简章
export function recruitmentById (data) {
  return Axios.get(baseUrl + '/edu/recruitment/recruitmentById/'+data)
}


