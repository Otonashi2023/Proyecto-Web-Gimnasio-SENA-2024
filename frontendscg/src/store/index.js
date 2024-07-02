import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {    
    variableGlobal:"",

    user: null,
  },
  getters: {
    obtenerVariableGlobal: (state)=> state.variableGlobal,   

    isAuthenticated: state => !!state.user,
  },
  mutations: {
    setVariableGlobal(state, nuevoValor){
      state.variableGlobal = nuevoValor;
    },
    clearVariableGlobal(state){
      state.variableGlobal = null;
    },

    setUser(state, user){
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  },
  actions: {
    actualizarVariableGlobal({commit},nuevoValor){
      commit('setVariableGlobal', nuevoValor);
    },
    limpiarVariableGlobal({commit}){
      commit('clearVariableGlobal');
    },

    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  plugins: [createPersistedState()],

  modules: {
  }
});
