import Cookies from 'js-cookie'

export const state = () => ({
  sidebar: true,
  menuTheme: 'dark',
  authUser: null,
  mapList: null,
  deviceList: null,
  currentPathArr: [],
  pageOpenedList: [{
    name: 'home_index',
    path: '/',
    title: '首頁'
  }]
})

export const getters = {
  authUser: state => state.authUser,
  sidebar: state => state.sidebar
}

export const mutations = {
  SET_DEVICELIST: function (state, list) {
    // console.log('$ mutations SET_DEVICELIST')
    state.deviceList = list
  },
  SET_MAP: function (state, list) {
    // console.log('$ mutations SET_USER')
    state.mapList = list
  },
  SET_USER: function (state, user) {
    // console.log('$ mutations SET_USER')
    state.authUser = user
  },
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  SET_ROUTERS: (state, routers) => {
    state.routers = state.routers.concat(routers)
  },
  SET_SIDEBAR: state => {
    /* if (state.sidebar) {
      console.log('******** state.sidebar true ==> stat : 1')
      Cookies.set('sidebarStat', 1)
    } else {
      console.log('******** state.sidebar false ==> stat : 0')
      Cookies.set('sidebarStat', 0)
    } */
    state.sidebar = !state.sidebar
  },
  SET_currentPathArr: (state, currentPathArr) => {
    state.currentPathArr = currentPathArr
  },
  addPageOpened: (state, tag) => {
    let flag = true
    state.pageOpenedList.map((item, index) => {
      if (item.name === tag.name) {
        flag = false
      }
    })
    if (flag) {
      state.pageOpenedList.push(tag)
    }
    if (state.pageOpenedList.length > 5) {
      state.pageOpenedList.splice(1, 1)
    }
  },
  closeOnePageOpend: (state, name) => {
    state.pageOpenedList.map((item, index) => {
      if (item.name === name) {
        state.pageOpenedList.splice(index, 1)
      }
    })
  },
  clearAllPageTags: (state) => {
    state.pageOpenedList = [{
      name: 'home_index',
      path: '/',
      title: '首頁'
    }]
  },
  clearOtherPageTags: (state, name) => {
    let newPageList = []
    state.pageOpenedList.map((item, index) => {
      if (item.name === name || item.name === 'home_index') {
        newPageList.push(item)
      }
    })
    state.pageOpenedList = newPageList
  },
  ChangeMenuTheme: (state, name) => {
    if (state.menuTheme === 'dark') {
      state.menuTheme = 'light'
    } else {
      state.menuTheme = 'dark'
    }
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  fetch ({redirect, store}) {
    if (store.state.authUser) {
      redirect('/')
    }
  },
  set_map ({ commit }, list) {
    try {
      // console.log('$store set_map' + JSON.stringify(list))
      commit('SET_MAP', list)
    } catch (error) {
      throw error
    }
  },
  set_devicelist ({ commit }, list) {
    try {
      // console.log('$store set_map' + JSON.stringify(list))
      commit('SET_DEVICELIST', list)
    } catch (error) {
      throw error
    }
  },
  ChangeSidebar: ({commit}) => {
    commit('SET_SIDEBAR')
  },
  GenerateRoutes({commit}, data){
    return new Promise(resolve => {
      commit('SET_ROUTERS', otherRouterMap);
      resolve();
    })
  },
  ChangeCurrentPathArr({commit}, data){
    commit('SET_currentPathArr', data);
  },
  async login ({ commit }, user) {
    try {
      console.log('$store login' + JSON.stringify(user))
      // const { data } = await this.$axios.post('/api/login', {user.login, user.pwd})
      commit('SET_USER', user)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async logout ({ commit }) {
    await this.$axios.post('/api/logout')
    commit('SET_USER', null)
  }

}
