import { getAprendizAllApi, getAprendizApi, createAprendizApi, updateAprendizApi, deleteAprendizApi } from "@/api/AprendizApi";

const state = {
  aprendiz:{
    codigo: null,
    restricMedicas: '',
    persona: null,
    ficha: null,
  },
  aprendices:[],
};

const getters = {
  getAprendiz: (state) => state.aprendiz,
  getAprendices: (state) => state.aprendices,
};

const mutations = {
  setAprendiz(state, data) {
    state.aprendiz = data;
  },
  setAprendices(state, data){
    state.aprendices = data;
  },
  clearAprendiz(state) {
    state.aprendiz = {
        codigo: null,
        restricMedicas: '',
        persona: null,
        ficha: null,
    };
  },
};

const actions = {
  async consultarAllAprendices({ commit }) {
    try {
      const response = await getAprendizAllApi();
      commit('setAprendices', response.data);
    } catch (error) {
      console.error("Error consultar all Aprendices:", error);
    }
  },
  async consultarAprendiz({ commit }, codigo) {
    try {
      const response = await getAprendizApi(codigo);
      commit('setAprendiz', response.data);
    } catch (error) {
      console.error("Error consultar Aprendiz", error);
    }
  },
  async guardarAprendiz({ commit }, data) {
    try {
      const response = await createAprendizApi(data);
      commit('setAprendiz', response.data);
    } catch (error) {
      console.error("Error guardar Aprendiz:", error);
    }
  },
  async actualizarAprendiz({ commit }, { codigo, data }) {
    try {
      const response = await updateAprendizApi(codigo, data);
      commit('setAprendiz', response.data);
    } catch (error) {
      console.error("Error actualizar Aprendiz:", error);
    }
  },
  async eliminarAprendiz({ commit }, codigo) {
    try {
      await deleteAprendizApi(codigo);
      commit('clearAprendiz');
    } catch (error) {
      console.error("Error eliminar Aprendiz:", error);
    }
  },
  limpiarAprendiz({commit}){
    commit('clearAprendiz');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
