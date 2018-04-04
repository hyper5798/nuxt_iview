import Cookies from 'js-cookie'

let util = {}
util.setCurrentPath = function (vm, name) {
  let currentPathArr = [{
    title: '首頁',
    path: '/',
    name: 'home_index'
  }]
  if (name === '') {
    return currentPathArr
  }
  return currentPathArr
}

util.toggleClass = function (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

util.getUser = function () {
  let authUser = Cookies.get('authUser')
  if (authUser !== '' && authUser !== undefined) {
    return JSON.parse(authUser)
  } else {
    return null
  }
}

util.removeUser = function () {
  Cookies.remove('authUser')
}

export default util
