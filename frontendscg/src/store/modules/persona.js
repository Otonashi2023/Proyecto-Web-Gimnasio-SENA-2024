import { getPersonaAllApi, getPersonaApi, createPersonaApi, updatePersonaApi, deletePersonaApi } from "@/api/PersonaApi";

const state = {
  persona:{
    codigo: null,
    nombres: '',
    apellidos: '',
    cedula: null,
    celular: null,
    cotacto: '',
    celularAlt: null,
    correo: '',
    tipoDocumento: null,
    nombreTipoDocumento:"",
  },
  personas:[],
};

const getters = {
  getPersona: (state) => state.persona,
  getPersonas: (state) => state.personas,
};

const mutations = {
  setPersona(state, data) {
    state.persona = data;
  },
  setPersonas(state, data){
    state.personas = data;
  },
  clearPersona(state) {
    state.persona = {
      codigo: null,
      nombres: '',
      apellidos: '',
      cedula: null,
      celular: null,
      contacto: '',
      celularAlt: null,
      correo: '',
      tipoDocumento: null,
      nombreTipoDocumento: '',
    };
  },
};

const actions = {
  async consultarAllPersonas({ commit }) {
    try {
      const response = await getPersonaAllApi();
      commit('setPersonas', response.data);
    } catch (error) {
      console.error("Error consultar all Personas:", error);
    }
  },
  async consultarPersona({ commit }, codigo) {
    try {
      const response = await getPersonaApi(codigo);
      commit('setPersona', response.data);
    } catch (error) {
      console.error("Error consultar Persona:", error);
    }
  },
  async guardarPersona({ commit }, data) {
    try {
      const response = await createPersonaApi(data);
      commit('setPersona', response.data);
    } catch (error) {
      console.error("Error guardar Persona:", error);
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error("Error request:", error.request);
      } else {
        // Algo pasó al configurar la solicitud que provocó un error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
      
    }
  },
  async actualizarPersona({ commit }, { codigo, data }) {
    try {
      const response = await updatePersonaApi(codigo, data);
      commit('setPersona', response.data);
    } catch (error) {
      console.error("Error actualizar Persona:", error);
    }
  },
  async eliminarPersona({ commit }, codigo) {
    try {
      await deletePersonaApi(codigo);
      commit('clearPersona');
    } catch (error) {
      console.error("Error eliminar Persona:", error);
    }
  },
  limpiarPersona({commit}){
    commit('clearPersona');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}