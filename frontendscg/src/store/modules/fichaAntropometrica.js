import { getFichaAntropoAllApi, getFichaAntropoApi, createFichaAntropoApi, updateFichaAntropoApi, deleteFichaAntropoApi } from "@/api/FichaAntropometricaApi";

const state = {
  fichaAntropo:{
    codigo: null,
    numControl: null,
    altura: null,
    peso: null,
    imc: null,
    personal: null,
    genero: null,
    aprendiz: null,
  },
  fichaAntropoAll:[],
};

const getters = {
  getFichaAntropo: (state) => state.fichaAntropo,
  getFichaAntropoAll: (state) => state.fichaAntropoAll,
};

const mutations = {
  setFichaAntropo(state, data) {
    state.fichaAntropo = data;
  },
  setFichaAntropoAll(state, data){
    state.fichaAntropoAll = data;
  },
  clearFichaAntropo(state) {
    state.fichaAntropo = {
        codigo: null,
        numControl: null,
        altura: null,
        peso: null,
        imc: null,
        personal: null,
        genero: null,
        aprendiz: null,
    };
  },
};

const actions = {
  async consultarFichaAntropoAll({ commit }) {
    try {
      const response = await getFichaAntropoAllApi();
      commit('setFichaAntropoAll', response.data);
    } catch (error) {
      console.error("Error consultar all FichaAntropoAll:", error);
    }
  },
  async consultarFichaAntropo({ commit }, codigo) {
    try {
      const response = await getFichaAntropoApi(codigo);
      commit('setFichaAntropo', response.data);
    } catch (error) {
      console.error("Error consultar FichaAntropo:", error);
    }
  },
  async guardarFichaAntropo({ commit }, data) {
    try {
      const response = await createFichaAntropoApi(data);
      commit('setFichaAntropo', response.data);
    } catch (error) {
      console.error("Error guardar FichaAntropo:", error);
    }
  },
  async actualizarFichaAntropo({ commit }, { codigo, data }) {
    try {
      const response = await updateFichaAntropoApi(codigo, data);
      commit('setFichaAntropo', response.data);
    } catch (error) {
      console.error("Error actualizar FichaAntropo:", error);
    }
  },
  async eliminarFichaAntropo({ commit }, codigo) {
    try {
      await deleteFichaAntropoApi(codigo);
      commit('clearFichaAntropo');
    } catch (error) {
      console.error("Error eliminar FichaAntropo:", error);
    }
  },
  limpiarPersona({commit}){
    commit('clearFichaAntropo');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
