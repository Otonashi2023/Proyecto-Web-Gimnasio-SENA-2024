export default{
    namespaced:true,

    state:{
        /*nombre: "",
        tipoEjercio: "",
        musculo: "",
        series: null,
        repeticiones: null,
        descanso: null,*/
        exercise:"",
        ejercicios:[],
        valor:null,
        arrayE:[],
        datos:null,
    },
    
    getters:{
        /*getNombre: (state) => state.nombre,
        getTipoEjercicio: (state) => state.tipoEjercicio,
        getMusculo: (state) => state.musculo,
        getSeries: (state) => state.series,
        getRepeticiones: (state) => state.repeticiones,
        getDescanso: (state) => state.descanso,*/
        getEjercicio: (state) => state.exercise,
        getEjercicios: (state) => state.ejercicios,
        getValor: (state) => state.valor,
        getArrayE:(state) => state.arrayE,
    },
    
    mutations:{
        /*setEjercicios(state, data){
            state.nombre = data.nombre.nombre;
            state.tipoEjercicio = data.tipoEjercicio.nombre;
            state.musculo = data.musculo.nombre;
            state.series = data.series;
            state.repeticiones = data.repeticiones;
            state.descanso = data.descanso;
        },*/
        
        addEjercicio(state){
            if(Array.isArray(state.ejercicios)){
                state.ejercicios = [state.exercise,...state.ejercicios];
            }
        },
        clearEjercicios(state){
            state.ejercicios = [];
        },
        updateEjercicio(state, ejercicio){
            state.exercise = ejercicio;
        },
        clearEjercicio(state){
            state.exercise = "";
        },
        removerEjercicio(state, codigo) {
            state.ejercicios = state.ejercicios.filter(ejercicio => ejercicio.codigo !== codigo);
          },
        addArrayE(state){
            if(Array.isArray(state.arrayE)){
                state.arrayE = [state.valor,...state.arrayE];
            }
        },
        clearArrayE(state){
            state.arrayE = [];
        },
        updateValor(state, valor){
            state.valor = valor;
        },
        clearValor(state){
            state.valor = null;
        },
        updateDatos(state, datos){
            state.datos = datos;
        },
        clearDatos(state){
            state.datos = null;
        },
        removerArrayE(state, codigo) {
            state.arrayE = state.arrayE.filter(ejercicio => ejercicio !== codigo);
          },
        /*clearEjercicios(state){
            state.nombre = "";
            state.tipoEjercicio = "";
            state.musculo ="";
            state.series = null;
            state.repeticiones =null;
            state.descanso = null;
        }*/
    },
    
    actions:{
        actionEjercicios({commit}){
            commit('addEjercicio');
        },  
        limpiarEjercicios({commit}){
            commit('clearEjercicios');
        }, 
        nuevoEjercicio({ commit }, ejercicio) {
            commit('updateEjercicio', ejercicio);
        },
        borrarEjercicio({commit}){
            commit('clearEjercicio');
        },
        quitarEjercicio({commit},codigo){
            commit('removerEjercicio', codigo);
        },
        actionArrayE({commit}){
            commit('addArrayE');
        },  
        limpiarArrayE({commit}){
            commit('clearArrayE');
        }, 
        nuevoValor({ commit }, valor) {
            commit('updateValor', valor);
        },
        borrarValor({commit}){
            commit('clearValor');
        },
        actionDatos({commit},datos){
            commit('updateDatos',datos);
        },
        quitarArrayE({commit},codigo){
            commit('removerArrayE', codigo);
        },
    },
}