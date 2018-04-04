/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}
/* 合法uri */
export function validateURL (textval) {
  const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlRegex.test(textval)
}

/* 小寫字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大寫字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小寫字母 */
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
