import { getPersonalAllApi, getPersonalApi, createPersonalApi, updatePersonalApi, deletePersonalApi } from "@/api/PersonalApi";

const state = {
  personal:{
    codigo: null,
    persona: null,
    cargo: null,
  },
  personalAll:[],
};

const getters = {
  getPersonal: (state) => state.personal,
  getPersonalAll: (state) => state.personalAll,
};

const mutations = {
  setPersonal(state, data) {
    state.personal = data;
  },
  setPersonalAll(state, data){
    state.personalAll = data;
  },
  clearPersonal(state) {
    state.personal = {
        codigo: null,
        persona: null,
        cargo: null,
    };
  },
};

const actions = {
  async consultarPersonalAll({ commit }) {
    try {
      const response = await getPersonalAllApi();
      commit('setPersonalAll', response.data);
    } catch (error) {
      console.error("Error consultar all PersonalAll:", error);
    }
  },
  async consultarPersona({ commit }, codigo) {
    try {
      const response = await getPersonalApi(codigo);
      commit('setPersonal', response.data);
    } catch (error) {
      console.error("Error consultar Personal:", error);
    }
  },
  async guardarPersonal({ commit }, data) {
    try {
      const response = await createPersonalApi(data);
      commit('setPersonal', response.data);
    } catch (error) {
      console.error("Error guardar Personal:", error);
    }
  },
  async actualizarPersonal({ commit }, { codigo, data }) {
    try {
      const response = await updatePersonalApi(codigo, data);
      commit('setPersonal', response.data);
    } catch (error) {
      console.error("Error actualizar Personal:", error);
    }
  },
  async eliminarPersonal({ commit }, codigo) {
    try {
      await deletePersonalApi(codigo);
      commit('clearPersonal');
    } catch (error) {
      console.error("Error eliminar Personal:", error);
    }
  },
  limpiarPersona({commit}){
    commit('clearPersonal');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
