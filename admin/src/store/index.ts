import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    env:process.env.NODE_ENV,
    bannerUrl:process.env.VUE_APP_API_BANER,
    uploadUrl:process.env.VUE_APP_API_UPLOAD,
    menus:[
      { name: "前端菜单", path: "menu/webtitle", url: "item/webitem" },
      { name: "数据结构与算法菜单", path: "menu/algtitle", url: "item/algitem" },
      { name: "后端菜单", path: "menu/servertitle", url: "item/serveritem" },
      { name: "设计模式菜单", path: "menu/modetitle", url: "item/modeitem" }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
