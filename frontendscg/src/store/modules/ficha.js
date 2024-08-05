const state = {
    ficha:{
        codigo:null,
        numero:null,
        formacion:null,
    }
};

const getters = {
    getFicha: (state) => state.ficha,
};

const mutations = {
    setFicha(state, data){
        state.ficha = data;
    },
    clearFicha(state){
        state.ficha = {
            codigo:null,
            numero:null,
            formacion:null,
        }
    }
};

const actions = {
    actionFicha({commit}, codigo){
        commit('setFicha', codigo);
    },
    limpiarFicha({commit}){
        commit('clearFicha');
    },   
};

export default{
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
}