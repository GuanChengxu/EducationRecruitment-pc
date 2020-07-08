/**
 * 填写资料
 */
import Axios from 'axios'
import qs from 'qs'

const baseUrl = 'http://154.8.201.198:8081'
// const baseUrl = 'http://localhost:8080'
const formConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

// 个人资料保存
export function saveTeacherInfo (data) {
  return Axios.post(baseUrl + '/edu/recruitment/saveTeacherInfo', data,config)
}

// 社会简历保存
export function saveSocialResume (data) {
  return Axios.post(baseUrl + '/edu/recruitment/saveSocialResume', data, config)
}

// 正式报名
export function applyTeacher (data) {
  return Axios.post(baseUrl + '/edu/recruitment/applyTeacher', data , config)
}

//获取学校
export function queryRecruitmentSchool (data) {
  return Axios.get(baseUrl + '/edu/recruitment/queryRecruitmentSchool?'+data)
}

//获取岗位
export function queryRecruitmentJob (data) {
  return Axios.get(baseUrl + '/edu/recruitment/queryRecruitmentJob?'+data)
}

//上传图片
export function avatar (data) {
  return Axios.post(baseUrl + '/edu/recruitment/avatar', data, formConfig)
}

