import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
//import axios from 'axios';

export default createStore({
  state: {  
    metodo:null,
    metodo2:null,
    metodo3:null,
    metodo4:null,
    metodo5:null,
    
    pantalla:false,
    retorno:'retorno',
    retorno2:'retorno2',

    dato:null,
    dato2:null,
    dato3:null,
    
    dato4: null,
    dato5:null,
    dato6:null,
    dato7:null,
    dato8:null,
    nombreE:null,

    nombre:"",
    tipoEjercicio:"",
    musculo:"",
    rutina:"",
    ejercicio:"",

    entidad:null,
    entidad2:null,

    visibleIn:false,
    visibleOut:true,
    
    user: null,
  },

  getters: {
    obtenerMetodo:(state)=>state.metodo,
    obtenerMetodo2:(state)=>state.metodo2,
    obtenerMetodo3:(state)=>state.metodo3,
    obtenerMetodo4:(state)=>state.metodo4,
    obtenerMetodo5:(state)=>state.metodo5,
    

    getPantalla: (state)=> state.pantalla,
    getRetorno: (state)=> state.retorno,
    getRetorno2: (state)=> state.retorno2,

    obtenerDato: (state)=> state.dato,
    obtenerDato2: (state) => state.dato2,
    obtenerDato3: (state)=> state.dato3,

    nombre: (state) => state.dato4,
    obtenerDato5: (state)=> state.dato5,
    tipoEjercicio: (state)=> state.dato6,
    obtenerDato7: (state)=> state.dato7,
    musculo: (state)=> state.dato8,
    obtenerNombreE:(state)=>state.nombreE,

    getNombre: (state)=> state.nombre,
    getTipoEjercicio: (state)=> state.tipoEjercicio,
    getMusculo: (state)=> state.musculo,
    getRutina: (state)=> state.rutina,
    getEjercicio: (state)=> state.ejercicio,

    getEntidad: (state)=> state.entidad,
    getEntidad2: (state)=> state.entidad2,

    inVisible: state => state.visibleIn,
    outVisible: state => state.visibleOut,

    isAuthenticated: state => !!state.user,
  },
  mutations: {
    setMetodo(state,metodo){
      state.metodo = metodo;
    },
    clearMetodo(state){
      state.metodo = null;
    },
    setMetodo2(state,metodo){
      state.metodo2 = metodo;
    },
    clearMetodo2(state){
      state.metodo2 = null;
    },
    setMetodo3(state,metodo){
      state.metodo3 = metodo;
    },
    clearMetodo3(state){
      state.metodo3 = null;
    },
    setMetodo4(state,metodo){
      state.metodo4 = metodo;
    },
    clearMetodo4(state){
      state.metodo4 = null;
    },
    setMetodo5(state,metodo){
      state.metodo5 = metodo;
    },
    clearMetodo5(state){
      state.metodo5 = null;
    },


    setPantalla(state, nuevodato){
      state.pantalla =nuevodato;
    },
    clearPantalla(state){
      state.pantalla = null;
    },
    setRetorno(state, nuevodato){
      state.retorno =nuevodato;
    },
    clearRetorno(state){
      state.retorno = null;
    },
    setRetorno2(state, nuevodato){
      state.retorno2 =nuevodato;
    },
    clearRetorno2(state){
      state.retorno2 = null;
    },


    setDato(state, nuevodato){
      state.dato = nuevodato;
    },
    clearDato(state){
      state.dato = null;
    },
    setDato2(state, nuevodato){
      state.dato2 = nuevodato;
    },
    clearDato2(state){
      state.dato2 = null;
    },
    setDato3(state, nuevodato){
      state.dato3 = nuevodato;
    },
    clearDato3(state){
      state.dato3 = null;
    },


    setDato4(state, nuevodato){
      state.dato4 = nuevodato;
    },
    clearDato4(state){
      state.dato4 = null;
    },
    setDato5(state, nuevodato){
      state.dato5 = nuevodato;
    },
    clearDato5(state){
      state.dato5 = null;
    },
    setDato6(state, nuevodato){
      state.dato6 = nuevodato;
    },
    clearDato6(state){
      state.dato6 = null;
    },
    setDato7(state, nuevodato){
      state.dato7 = nuevodato;
    },
    clearDato7(state){
      state.dato7 = null;
    },
    setDato8(state, nuevodato){
      state.dato8 = nuevodato;
    },
    clearDato8(state){
      state.dato8 = null;
    },
    setNombreE(state, nombre){
      state.nombreE = nombre;
    },
    clearNombreE(state){
      state.nombreE = null;
    },


    setNombre(state, nuevodato){
      state.nombre = nuevodato;
    },
    clearNombre(state){
      state.nombre = "";
    },
    setTipoEjercicio(state, nuevodato){
      state.tipoEjercicio = nuevodato;
    },
    clearTipoEjercicio(state){
      state.tipoEjercicio = "";
    },
    setMusculo(state, nuevodato){
      state.musculo = nuevodato;
    },
    clearMusculo(state){
      state.musculo = "";
    },
    setRutina(state, nuevodato){
      state.rutina = nuevodato;
    },
    clearRutina(state){
      state.rutina = "";
    },
    setEjercicio(state, nuevodato){
      state.ejercicio = nuevodato;
    },
    clearEjercicio(state){
      state.ejercicio = "";
    },
    

    setEntidad(state, nuevodato){
      state.entidad = nuevodato;
    },
    clearEntidad(state){
      state.entidad = "";
    },
    setEntidad2(state, nuevodato){
      state.entidad2 = nuevodato;
    },
    clearEntidad2(state){
      state.entidad2 = "";
    },


    setVisibleIn(state, visible){
      state.visibleIn = visible
    },
    clearVisibleIn(state){
      state.visibleIn =false;
    },
    setVisibleOut(state, visible){
      state.visibleOut = visible
    },
    clearVisibleOut(state){
      state.visibleOut =true;
    },


    setUser(state, user){
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  },

  actions: {
    registrarMetodo({commit}, metodo){
      commit('setMetodo', metodo);
    },
    limpiarMetodo({commit}){
      commit('clearMetodo');
    },
    callMetodo({state}){
      if(state.metodo){
        state.metodo();
      }
      else{
        console.error('Metodo no encontrado');
      }
    },
    registrarMetodo2({commit}, metodo){
      commit('setMetodo2', metodo);
    },
    limpiarMetodo2({commit}){
      commit('clearMetodo2');
    },
    callMetodo2({state}){
      if(state.metodo2){
        state.metodo2();
      }
      else{
        console.error('Metodo no encontrado');
      }
    },
    registrarMetodo3({commit}, metodo){
      commit('setMetodo3', metodo);
    },
    limpiarMetodo3({commit}){
      commit('clearMetodo3');
    },
    callMetodo3({state}){
      if(state.metodo3){
        state.metodo3();
      }
      else{
        console.error('Metodo no encontrado');
      }
    },
    registrarMetodo4({commit}, metodo){
      commit('setMetodo4', metodo);
    },
    limpiarMetodo4({commit}){
      commit('clearMetodo4');
    },
    callMetodo4({state}){
      if(state.metodo4){
        state.metodo4();
      }
      else{
        console.error('Metodo no encontrado');
      }
    },
    registrarMetodo5({commit}, metodo){
      commit('setMetodo5', metodo);
    },
    limpiarMetodo5({commit}){
      commit('clearMetodo5');
    },
    callMetodo5({state}){
      if(state.metodo5){
        state.metodo5();
        alert("hola desde el store metodo 5")
      }
      else{
        console.error('Metodo no encontrado');
      }
    },

    showPantalla({commit},nuevodato){
      commit('setPantalla',nuevodato);
    },
    hiddenPantalla({commit}){
      commit('clearPantalla');
    },
    actualizarRetorno({commit},nuevodato){
      commit('setRetorno', nuevodato);
    },
    limpiarRetorno({commit}){
      commit('clearRetorno');
    },
    actualizarRetorno2({commit},nuevodato){
      commit('setRetorno2', nuevodato);
    },
    limpiarRetorno2({commit}){
      commit('clearRetorno2');
    },
    

    actualizarDato({commit},nuevodato){
      commit('setDato', nuevodato);
    },
    limpiarDato({commit}){
      commit('clearDato');
    },
    actualizarDato2({commit},nuevodato){
      commit('setDato2', nuevodato);
    },
    limpiarDato2({commit}){
      commit('clearDato2');
    },
    actualizarDato3({commit},nuevodato){
      commit('setDato3', nuevodato);
    },
    limpiarDato3({commit}){
      commit('clearDato3');
    },


    actualizarDato4({commit},nuevodato){
      commit('setDato4', nuevodato);
    },
    limpiarDato4({commit}){
      commit('clearDato4');
    },
    actualizarDato5({commit},nuevodato){
      commit('setDato5', nuevodato);
    },
    limpiarDato5({commit}){
      commit('clearDato5');
    },
    actualizarDato6({commit},nuevodato){
      commit('setDato6', nuevodato);
    },
    limpiarDato6({commit}){
      commit('clearDato6');
    },
    actualizarDato7({commit},nuevodato){
      commit('setDato7', nuevodato);
    },
    limpiarDato7({commit}){
      commit('clearDato7');
    },
    actualizarDato8({commit},nuevodato){
      commit('setDato8', nuevodato);
    },
    limpiarDato8({commit}){
      commit('clearDato8');
    },
    registrarNombreE({commit}, nombre){
      commit('setNombreE',nombre);
    },
    limpiarNombreE({commit}){
      commit('clearNombreE');
    },

    
    registrarNombre({commit}, nombre){
      commit('setNombre',nombre);
    },
    limpiarNombre({commit}){
      commit('clearNombre');
    },
    registrarTipoEjercicio({commit}, nombre){
      commit('setTipoEjercicio',nombre);
    },
    limpiarTipoEjercicio({commit}){
      commit('clearTipoEjercicio');
    },
    registrarMusculo({commit}, nombre){
      commit('setMusculo',nombre);
    },
    limpiarMusculo({commit}){
      commit('clearMusculo');
    },
    registrarRutina({commit}, nombre){
      commit('setRutina',nombre);
    },
    limpiarRutina({commit}){
      commit('clearRutina');
    },
    registrarEjercicio({commit}, nombre){
      commit('setEjercicio',nombre);
    },
    limpiarEjercicio({commit}){
      commit('clearEjercicio');
    },


    registrarEntidad({commit}, nombre){
      commit('setEntidad',nombre);
    },
    limpiarEntidad({commit}){
      commit('clearEntidad');
    },
    registrarEntidad2({commit}, nombre){
      commit('setEntidad2',nombre);
    },
    limpiarEntidad2({commit}){
      commit('clearEntidad2');
    },


    updateVisibleIn({commit},visible){
      commit('setVisibleIn', visible);
    },
    resetVisibleIn({commit}){
      commit('clearVisibleIn');
    },
    updateVisibleOut({commit},visible){
      commit('setVisibleOut', visible);
    },
    resetVisibleOut({commit}){
      commit('clearVisibleOut');
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