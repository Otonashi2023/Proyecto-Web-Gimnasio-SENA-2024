import { getUsuarioAllApi, getUsuarioApi, createUsuarioApi, updateUsuarioApi, deleteUsuarioApi } from "@/api/UsuariosApi";

const state = {
  usuario:{
    codigo: null,
    username: '',
    password: '',
    personal: null,
  },
  usuarios:[],
};

const getters = {
  getUsuario: (state) => state.usuario,
  getUsuarios: (state) => state.usuarios,
};

const mutations = {
  setUsuario(state, data) {
    state.usuario = data;
  },
  setUsuarios(state, data){
    state.usuarios = data;
  },
  clearUsuario(state) {
    state.usuario = {
      codigo: null,
      username: '',
      password: '',
      personal: null,
    };
  },
};

const actions = {
  async consultarAllUsuarios({ commit }) {
    try {
      const response = await getUsuarioAllApi();
      commit('setUsuarios', response.data);
    } catch (error) {
      console.error("Error consultar all Usuarios:", error);
    }
  },
  async consultarUsuario({ commit }, codigo) {
    try {
      const response = await getUsuarioApi(codigo);
      commit('setUsuario', response.data);
    } catch (error) {
      console.error("Error consultar Usuario", error);
    }
  },
  async guardarUsuario({ commit }, data) {
    try {
      const response = await createUsuarioApi(data);
      commit('setUsuario', response.data);
    } catch (error) {
      console.error("Error guardar Usuario:", error);
    }
  },
  async actualizarUsuario({ commit }, { codigo, data }) {
    try {
      const response = await updateUsuarioApi(codigo, data);
      commit('setUsuario', response.data);
    } catch (error) {
      console.error("Error actualizar Usuario:", error);
    }
  },
  async eliminarUsuario({ commit }, codigo) {
    try {
      await deleteUsuarioApi(codigo);
      commit('clearUsuario');
    } catch (error) {
      console.error("Error eliminar Usuario:", error);
    }
  },
  limpiarUsuario({commit}){
    commit('clearUsuario');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
