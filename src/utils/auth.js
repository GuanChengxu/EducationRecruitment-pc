import Cookies from 'js-cookie'


export function getUserId () {
  return Cookies.get('userInfo')
}

export function setUserId (data) {
  return Cookies.set('userInfo',data)
}

export function removeUserId () {
  return Cookies.remove('userInfo')
}

// export function setExamTime (data) {
//   return localStorage.setItem()
// }
//
// export function getExamTime () {
//   return localStorage.getItem()
// }
//
// export function removeExamTime () {
//   return localStorage.removeItem()
// }
