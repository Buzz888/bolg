import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const createStore = () => {
  const store = new Vuex.Store({
    state: {
      menu: true,
      skel: false,
      web: '',
      server:'',
      alg:'',
      mode:'',
      md: '',
    },
    getters: {
    },
    mutations: {
      setmenu(state) { state.menu = !state.menu },
      setweb(state, res) { state.web = res },
      setserver(state,res) { state.server = res},
      setalg(state,res) { state.alg = res},
      setmode(state,res) { state.mode = res},
      setmd(state, res) { state.md = res }
    },
    actions: {
      //web
      async getweb({ commit }) {
        const res = await Vue.prototype.$http.get('api/web/menu/web')
        return commit('setweb', res.data)
      },
      //server
      async getserver({ commit }) {
        const res = await Vue.prototype.$http.get('api/web/menu/server')
        return commit('setserver', res.data)
      },
      //alg
      async getalg({ commit }) {
        const res = await Vue.prototype.$http.get('api/web/menu/alg')
        return commit('setalg', res.data)
      },
      //mode
      async getmode({ commit }) {
        const res = await Vue.prototype.$http.get('api/web/menu/mode')
        return commit('setmode', res.data)
      },
      //md
      async getmd({ commit, state }) {
        state.skel = true
        if (state.route.params.id) {
          const res = await Vue.prototype.$http.get(`/app/${state.route.params.id}`)
          state.skel = false

          return commit('setmd', res.data)
        }
      }

    },
    modules: {

    },
  });

  return store;
};

export { createStore };
