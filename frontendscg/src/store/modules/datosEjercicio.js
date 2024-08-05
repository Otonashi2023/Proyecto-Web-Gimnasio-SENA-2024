export default{
    namespaced: true,
    state:{
        series:'hola',
        repeticiones:null,
        descanso:null,
    },
    getters:{
        getSeries:(state)=> state.series,
        getRepeticiones:(state)=> state.repeticiones,
        getDescanso:(state)=> state.descanso,
    },
    mutations:{
        setSeries(state, nuevodato){
            state.series= nuevodato;
        },
        clearSeries(state){
            state.series= null;
        },
        setRepeticiones(state, nuevodato){
            state.repeticiones= nuevodato;
        },
        clearRepeticiones(state){
            state.repeticiones= null;
        },
        setDescanso(state, nuevodato){
            state.descanso= nuevodato;
        },
        clearDescanso(state){
            state.descanso= null;
        },
    },
    actions:{
        actualizarSeries({commit},nuevodato){
            commit('setSeries',nuevodato);
        },
        limpiarSeries({commit}){
            commit('clearSeries');
        },
        actualizarRepeticiones({commit},nuevodato){
            commit('setRepeticiones',nuevodato);
        },
        limpiarRepeticiones({commit}){
            commit('clearRepeticiones');
        },
        actualizarDescanso({commit},nuevodato){
            commit('setDescanso',nuevodato);
        },
        limpiarDescanso({commit}){
            commit('clearDescanso');
        },
    }
}