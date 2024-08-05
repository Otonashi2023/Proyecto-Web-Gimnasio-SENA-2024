import { getPerimetrosAllApi, getPerimetrosApi, createPerimetrosApi, updatePerimetrosApi, deletePerimetrosApi } from "@/api/PerimetrosApi";

const state = {
  perimetros:{
    codigo: null,
    cabeza: null,
    cuello: null,
    brazoRelax: null,
    brazoTenso: null,
    antebrazo: null,
    muñeca: null,
    torax: null,
    cintura: null,
    cadera: null,
    musloMax: null,
    musloMin: null,
    pantorrillaMax: null,
    pantorillaMin: null,
    fichaantropo: null,
  },
  perimetrosAll:[],
};

const getters = {
  getPerimetros: (state) => state.perimetros,
  getPerimetrosAll: (state) => state.perimetrosAll,
};

const mutations = {
  setPerimetros(state, data) {
    state.perimetros = data;
  },
  setPerimetrosAll(state, data){
    state.perimetrosAll = data;
  },
  clearPerimetros(state) {
    state.perimetros = {
      codigo: null,
      cabeza: null,
      cuello: null,
      brazoRelax: null,
      brazoTenso: null,
      antebrazo: null,
      muñeca: null,
      torax: null,
      cintura: null,
      cadera: null,
      musloMax: null,
      musloMin: null,
      pantorrillaMax: null,
      pantorillaMin: null,
      fichaantropo: null,
    };
  },
};

const actions = {
  async consultarPerimetrosAll({ commit }) {
    try {
      const response = await getPerimetrosAllApi();
      commit('setPerimetrosAll', response.data);
    } catch (error) {
      console.error("Error consultar all PerimetrosAll:", error);
    }
  },
  async consultarPerimetros({ commit }, codigo) {
    try {
      const response = await getPerimetrosApi(codigo);
      commit('setPerimetros', response.data);
    } catch (error) {
      console.error("Error consultar Perimetros", error);
    }
  },
  async guardarPerimetros({ commit }, data) {
    try {
      const response = await createPerimetrosApi(data);
      commit('setPerimetros', response.data);
    } catch (error) {
      console.error("Error guardar Perimetros:", error);
    }
  },
  async actualizarPerimetros({ commit }, { codigo, data }) {
    try {
      const response = await updatePerimetrosApi(codigo, data);
      commit('setPerimetros', response.data);
    } catch (error) {
      console.error("Error actualizar Perimetros:", error);
    }
  },
  async eliminarPerimetros({ commit }, codigo) {
    try {
      await deletePerimetrosApi(codigo);
      commit('clearPerimetros');
    } catch (error) {
      console.error("Error eliminar Perimetros:", error);
    }
  },
  limpiarPerimetros({commit}){
    commit('clearPerimetros');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
