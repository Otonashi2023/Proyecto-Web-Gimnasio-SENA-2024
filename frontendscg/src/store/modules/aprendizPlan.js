import { getAprendizPlanAllApi, getAprendizPlanApi, createAprendizPlanApi, updateAprendizPlanApi, deleteAprendizPlanApi } from "@/api/AprendizPlanApi";

const state = {
  aprendizPlan:{
    codigo: null,
    inicio: '',
    finaliza: '',
    aprendiz: null,
    plan: null,
  },
  aprendizPlanAll:[],
};

const getters = {
  getAprendizPlan: (state) => state.aprendizPlan,
  getAprendicesPlanAll: (state) => state.aprendizPlanAll,
};

const mutations = {
  setAprendizPlan(state, data) {
    state.aprendizPlan = data;
  },
  setAprendizPlanAll(state, data){
    state.aprendizPlanAll = data;
  },
  clearAprendizPlan(state) {
    state.aprendizPlan = {
        codigo: null,
        inicio: '',
        finaliza: '',
        aprendiz: null,
        plan: null,
    };
  },
};

const actions = {
  async consultarAprendizPlanAll({ commit }) {
    try {
      const response = await getAprendizPlanAllApi();
      commit('setAprendizPlanAll', response.data);
    } catch (error) {
      console.log('listar: ',this.aprendizPlanAll);
      console.error("Error consultar all AprendizPlanAll:", error);
    }
  },
  async consultarAprendizPlan({ commit }, codigo) {
    try {
      const response = await getAprendizPlanApi(codigo);
      commit('setAprendizPlan', response.data);
    } catch (error) {
      console.error("Error consultar AprendizPlan", error);
    }
  },
  async guardarAprendizPlan({ commit }, data) {
    try {
      const response = await createAprendizPlanApi(data);
      commit('setAprendizPlan', response.data);
    } catch (error) {
      console.error("Error guardar AprendizPlan:", error);
    }
  },
  async actualizarAprendizPlan({ commit }, { codigo, data }) {
    try {
      const response = await updateAprendizPlanApi(codigo, data);
      commit('setAprendizPlan', response.data);
    } catch (error) {
      console.error("Error actualizar AprendizPlan:", error);
    }
  },
  async eliminarAprendizPlan({ commit }, codigo) {
    try {
      await deleteAprendizPlanApi(codigo);
      commit('clearAprendizPlan');
    } catch (error) {
      console.error("Error eliminar AprendizPlan:", error);
    }
  },
  limpiarAprendizPlan({commit}){
    commit('clearAprendizPlan');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
